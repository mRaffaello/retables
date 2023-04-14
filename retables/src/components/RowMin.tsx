// Components
import Cell from './Cell';

// Config
import { GRID_DEFALTS } from '../config/constants';

// Types
import { ColumnConfig } from '../types/table';
import { memo, useCallback, useMemo, useState } from 'react';

import { deepEqual } from 'fast-equals';
import { NestedKeyOf, NestedKeyOfWithOptionals } from '../types/structs';
import styled from '@emotion/styled';
import { CSS_VARIABLE } from '../types/enums';

type RowMin<T> = {
    data: T;
    indexKey: NestedKeyOf<T>;
    indexTable: number;
    columnConfigs: ColumnConfig<T>[];
    defaultChecked?: boolean;
    baseRowClasses?: string | ((index: number, isSelected: boolean) => string);
    baseHeaderClasses?: string;
    cellRenderer?: (props: { text: any; rowIndex: number }) => JSX.Element;
    baseHeaderRenderer?: (props: { title: string }) => JSX.Element;
    onCellPress?: (
        item: T,
        column: {
            index: number;
            key?: NestedKeyOfWithOptionals<T>;
        }
    ) => any;
    onSelectionChange?: (key: any) => void;
};

function RowMin<T = any>(props: RowMin<T>) {
    // State
    const [isSelected, setIsSelected] = useState(!!props.defaultChecked);

    // Memos
    const baseRowClasses = useMemo(() => {
        if (!props.baseRowClasses) return;
        if (typeof props.baseRowClasses === 'string') return props.baseRowClasses;
        else return props.baseRowClasses(props.indexTable, isSelected);
    }, [props.baseRowClasses, isSelected, props.indexTable]);

    // Callbacks
    const renderHeaderCell = useCallback(
        (columnConfig: ColumnConfig<T>) => {
            if (columnConfig.headerRenderer)
                return <columnConfig.headerRenderer title={columnConfig.title} />;
            else if (props.baseHeaderRenderer)
                return <props.baseHeaderRenderer title={columnConfig.title} />;
            else return <DefaultHeaderContainer>{columnConfig.title}</DefaultHeaderContainer>;
        },
        [props.baseHeaderRenderer]
    );

    // Render
    return (
        <BodyContainer>
            {props.columnConfigs.map((c, i) => (
                <RowContainer key={c.key ? String(c.key) : i} className={baseRowClasses}>
                    <CellHeaderContainer className={props.baseHeaderClasses}>
                        {renderHeaderCell(c)}
                    </CellHeaderContainer>
                    <CellValueContainer
                        onClick={() =>
                            props.onCellPress &&
                            props.onCellPress(props.data, {
                                key: c.key,
                                index: i
                            })
                        }>
                        <Cell
                            columnKey={c.key}
                            columnRenderer={c.renderer}
                            rowIndex={i}
                            item={props.data as any}
                            cellRenderer={props.cellRenderer}
                        />
                    </CellValueContainer>
                </RowContainer>
            ))}
        </BodyContainer>
    );
}

const BodyContainer = styled.tbody`
    display: flex;
    flex-direction: column;
    width: 100%;
    :not(:last-child) {
        border-bottom: solid;
        border-bottom-width: var(${CSS_VARIABLE.GRID_WIDTH_HORIZONTAL}, ${GRID_DEFALTS.WIDTH}px);
        border-bottom-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
    }
`;

const CellValueContainer = styled.td`
    flex: 0.7;
    overflow: hidden;
    padding-left: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-right: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-top: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
    padding-bottom: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
`;

const DefaultHeaderContainer = styled.div`
    text-align: left;
`;

const RowContainer = styled.tr`
    display: flex;
    width: 100%;
`;

const CellHeaderContainer = styled.th`
    flex: 0.3;
    overflow: hidden;
    padding-left: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-right: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-top: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
    padding-bottom: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
`;

export default memo(RowMin, (p, n) => {
    return (
        deepEqual(p.data, n.data) &&
        deepEqual(p.columnConfigs, n.columnConfigs) &&
        String(p.baseRowClasses) === String(n.baseRowClasses) &&
        p.indexTable === n.indexTable
    );
}) as typeof RowMin;
