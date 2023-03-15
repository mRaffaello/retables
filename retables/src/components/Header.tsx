// React
import { memo, useCallback } from 'react';
import { SORT_DIRECTION } from '../types/enums';
import { ColumnConfig, ColumnOrder, OrderIconsConfig, SelectionConfig } from '../types/table';

// Assets
import Bars2Icon from '../icons/Bars2Icon';
import ChevronDoubleDownIcon from '../icons/ChevronDoubleDownIcon';
import ChevronDoubleUpIcon from '../icons/ChevronDoubleUpIcon';
import { NestedKeyOf } from '../types/structs';
import { gc } from '../utils/css';
import { CSS_VARIABLE } from '../types/enums';
import styled from '@emotion/styled';
import { GRID_DEFALTS } from '../config/constants';

type HeaderProps<T> = {
    columnConfigs: ColumnConfig<T>[];
    baseHeaderClasses?: string;
    columnOrder?: ColumnOrder<T>;
    orderIconsConfig?: OrderIconsConfig;
    hasSelectionConfig?: boolean;
    allKeysChecked?: boolean;
    setColumnOrder: (key: NestedKeyOf<T>) => void;
    baseHeaderRenderer?: (props: { title: string }) => JSX.Element;
    headerSelectionRenderer?: SelectionConfig['headerRenderer'];
    onSelectionChange?: (key: any, globalSwitch?: boolean) => void;
};

function Header<T = any>(props: HeaderProps<T>) {
    // Props
    const { columnConfigs, baseHeaderClasses, columnOrder, orderIconsConfig, setColumnOrder } =
        props;

    // Methods
    const onChange = () => {
        if (!props.onSelectionChange) return;
        if (props.allKeysChecked) props.onSelectionChange(undefined, false);
        else props.onSelectionChange(undefined, true);
    };

    // Callbacks
    const renderHeaderIcon = useCallback(
        (column: ColumnConfig<T>) => {
            const direction =
                columnOrder?.key === column.key ? columnOrder.direction : SORT_DIRECTION.INITIAL;

            switch (direction) {
                case SORT_DIRECTION.ASC:
                    return orderIconsConfig && orderIconsConfig.ASC ? (
                        orderIconsConfig.ASC()
                    ) : (
                        <ChevronDoubleDownIcon style={styles.icon} />
                    );
                case SORT_DIRECTION.DESC:
                    return orderIconsConfig && orderIconsConfig.DESC ? (
                        orderIconsConfig.DESC()
                    ) : (
                        <ChevronDoubleUpIcon style={styles.icon} />
                    );
                default:
                    return orderIconsConfig && orderIconsConfig.INITIAL ? (
                        orderIconsConfig.INITIAL()
                    ) : (
                        <Bars2Icon style={styles.icon} />
                    );
            }
        },
        [columnOrder, orderIconsConfig]
    );

    const renderHeaderCell = useCallback(
        (columnConfig: ColumnConfig<T>) => {
            if (columnConfig.headerRenderer)
                return <columnConfig.headerRenderer title={columnConfig.title} />;
            else if (props.baseHeaderRenderer)
                return <props.baseHeaderRenderer title={columnConfig.title} />;
            else return columnConfig.title;
        },
        [props.baseHeaderRenderer]
    );

    const renderHeader = () => (
        <HeaderWrapperContainer>
            <HeaderContainer className={baseHeaderClasses}>
                {props.hasSelectionConfig && (
                    <SelectionContainer>
                        {props.headerSelectionRenderer ? (
                            <props.headerSelectionRenderer
                                checked={props.allKeysChecked}
                                onChange={onChange}
                            />
                        ) : (
                            <></>
                        )}
                    </SelectionContainer>
                )}
                {columnConfigs.map((c, i) => (
                    <CellContainer
                        key={String(c.key)}
                        index={props.hasSelectionConfig ? i + 1 : i}
                        onClick={() => !c.disableOrderIcon && setColumnOrder(c.key)}>
                        {!c.disableOrderIcon && renderHeaderIcon(c)}
                        {renderHeaderCell(c)}
                    </CellContainer>
                ))}
            </HeaderContainer>
        </HeaderWrapperContainer>
    );

    // Render
    return renderHeader();
}

const SelectionContainer = styled.th`
    display: flex;
    align-items: center;
    width: var(${gc(CSS_VARIABLE.CELL_COL_N_WIDTH, [0])});
`;

type CellContainerProps = {
    index: number;
};

const CellContainer = styled.th<CellContainerProps>`
    display: flex;
    align-items: center;
    width: var(${props => gc(CSS_VARIABLE.CELL_COL_N_WIDTH, [props.index])});
    padding-left: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-right: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-top: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
    padding-bottom: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
    overflow: hidden;
`;

const HeaderWrapperContainer = styled.thead`
    display: flex;
    width: 100%;
    box-sizing: border-box;
    border-bottom: solid;
    border-bottom-width: var(${CSS_VARIABLE.GRID_WIDTH_HORIZONTAL}, ${GRID_DEFALTS.WIDTH}px);
    border-bottom-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
`;

const HeaderContainer = styled.tr`
    display: flex;
    width: 100%;
`;

const styles: { [key: string]: React.CSSProperties } = {
    icon: {
        height: 16,
        width: 16,
        marginRight: '.45rem',
        color: 'rgb(180, 180, 180)',
        cursor: 'pointer'
    }
};

export default memo(Header) as typeof Header;
