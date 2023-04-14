// Components
import Cell from './Cell';

// Config
import { GRID_DEFALTS } from '../config/constants';

// Types
import { SelectionConfig, ColumnConfig, OptionsCell } from '../types/table';
import { memo, useMemo } from 'react';
import { getByString } from '../utils/objects';

import { deepEqual } from 'fast-equals';
import { NestedKeyOf, NestedKeyOfWithOptionals } from '../types/structs';
import styled from '@emotion/styled';
import { gc } from '../utils/css';
import { CSS_VARIABLE } from '../types/enums';

type RowProps<T> = {
    data: T;
    indexKey: NestedKeyOf<T>;
    indexTable: number;
    columnConfigs: ColumnConfig<T>[];
    checked?: boolean;
    baseRowClasses?: string | ((index: number, isSelected: boolean) => string);
    optionsCellRenderer?: OptionsCell<T>['renderer'];
    selectionConfigRenderer?: SelectionConfig['renderer'];
    onSelectionChange?: (key: any) => void;
    onCellPress?: (
        item: T,
        column: {
            index: number;
            key?: NestedKeyOfWithOptionals<T>;
        }
    ) => any;
    cellRenderer?: (props: { text: any; rowIndex: number }) => JSX.Element;
};

function Row<T = any>(props: RowProps<T>) {
    // Memos
    const baseRowClasses = useMemo(() => {
        if (!props.baseRowClasses) return;
        if (typeof props.baseRowClasses === 'string') return props.baseRowClasses;
        else return props.baseRowClasses(props.indexTable, !!props.checked);
    }, [props.baseRowClasses, props.checked, props.indexTable]);

    // Methods
    const onSelectionChange = () => {
        if (props.onSelectionChange) {
            props.onSelectionChange(getByString(props.data, props.indexKey));
        }
    };

    // Render
    return (
        <RowContainer className={baseRowClasses}>
            {props.selectionConfigRenderer && (
                <SelectionContainer>
                    <props.selectionConfigRenderer
                        checked={props.checked}
                        onChange={onSelectionChange}
                    />
                </SelectionContainer>
            )}
            {props.columnConfigs.map((c, i) => (
                <CellContainer
                    key={c.key ? String(c.key) : i}
                    index={props.selectionConfigRenderer ? i + 1 : i}
                    onClick={() =>
                        props.onCellPress && props.onCellPress(props.data, { key: c.key, index: i })
                    }>
                    <Cell
                        columnRenderer={c.renderer}
                        columnKey={c.key}
                        rowIndex={i}
                        item={props.data as any}
                        cellRenderer={props.cellRenderer}
                    />
                </CellContainer>
            ))}
            {props.optionsCellRenderer && (
                <OptionsContainer
                    index={
                        props.selectionConfigRenderer
                            ? props.columnConfigs.length + 1
                            : props.columnConfigs.length
                    }>
                    <props.optionsCellRenderer
                        rowIndex={props.indexTable}
                        item={props.data as any}
                    />
                </OptionsContainer>
            )}
        </RowContainer>
    );
}

const RowContainer = styled.tr`
    display: flex;
    width: 100%;
    :not(:last-child) {
        border-bottom: solid;
        border-bottom-width: var(${CSS_VARIABLE.GRID_WIDTH_HORIZONTAL}, ${GRID_DEFALTS.WIDTH}px);
        border-bottom-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
    }
`;

type CellContainerProps = {
    index: number;
};

const CellContainer = styled.td<CellContainerProps>`
    overflow: hidden;
    width: var(${props => gc(CSS_VARIABLE.CELL_COL_N_WIDTH, [props.index])});
    padding-left: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-right: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-top: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
    padding-bottom: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
`;

const SelectionContainer = styled.td`
    width: var(${gc(CSS_VARIABLE.CELL_COL_N_WIDTH, [0])});
    overflow: hidden;
`;

type OptionsContainerProps = {
    index: number;
};

const OptionsContainer = styled.td<OptionsContainerProps>`
    width: var(${props => gc(CSS_VARIABLE.CELL_COL_N_WIDTH, [props.index])});
    overflow: hidden;
`;

export default memo(Row, (p, n) => {
    return (
        deepEqual(p.data, n.data) &&
        deepEqual(p.columnConfigs, n.columnConfigs) &&
        String(p.baseRowClasses) === String(n.baseRowClasses) &&
        p.indexTable === n.indexTable &&
        p.checked === n.checked
    );
}) as typeof Row;
