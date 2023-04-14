import { useMemo } from 'react';
import { SKELETON_DEFAULTS } from '../config/constants';
import { NestedKeyOf } from '../types/structs';
import { ColumnOrder, TableConfig } from '../types/table';
import Header from './Header';
import Row from './Row';
import SkeletonRow from './SkeletonRow';
import Axis from './Axis';
import { getByString } from '../utils/objects';
import styled from '@emotion/styled';
import ExternLines from './ExternLines';
import { compareBreakpoints, getColsPercentages } from '../utils/spacing';
import useBreakpoint from '../hooks/useBreakpoint';

type TableFullProps<T> = {
    checkedKeys: any[];
    columnOrder?: ColumnOrder;
    allKeysChecked?: boolean;
    setColumnOrder: (index: number) => void;
    onSelectionChange: (key: any, globalSwitch?: boolean) => void;
} & TableConfig<T>;

function TableFull<T = any>(props: TableFullProps<T>) {
    // Hooks
    const breakpoint = useBreakpoint();

    // Memos
    const visibleColumns = useMemo(
        () =>
            props.columnConfigs.filter(c =>
                c.showAt ? compareBreakpoints(breakpoint, c.showAt) : true
            ),
        [props.columnConfigs, breakpoint]
    );

    const colsPercentages = useMemo(
        () =>
            getColsPercentages(
                visibleColumns,
                props.selectionConfig?.flex,
                props.optionsCell?.flex
            ),
        [visibleColumns, props.selectionConfig?.flex, props.optionsCell?.flex]
    );

    // Methods
    const renderRows = () =>
        props.data!.map((d, i) => (
            <Row<T>
                key={String(getByString(d, props.indexKey) ?? i)}
                data={d}
                indexKey={props.indexKey}
                indexTable={i}
                columnConfigs={visibleColumns}
                baseRowClasses={props.baseRowClasses}
                optionsCellRenderer={props.optionsCell?.renderer}
                selectionConfigRenderer={props.selectionConfig?.renderer}
                checked={props.checkedKeys.includes(getByString(d, props.indexKey))}
                cellRenderer={props.cellRenderer}
                onCellPress={props.onCellPress}
                onSelectionChange={props.onSelectionChange}
            />
        ));

    const renderSkeletonRows = () =>
        Array(props.skeletonConfig?.rows || SKELETON_DEFAULTS.ROWS)
            .fill(0)
            .map((_, i) => (
                <SkeletonRow
                    key={i}
                    indexTable={i}
                    colsPercentages={colsPercentages}
                    baseRowClasses={props.baseRowClasses}
                    skeletonConfig={props.skeletonConfig!}
                />
            ));

    const renderBody = () => {
        if (!props.data && props.skeletonConfig) return renderSkeletonRows();
        else if (props.data) return renderRows();
        else return <div />;
    };

    // Render
    return (
        <TableWrapperContainer className={props.className}>
            <Axis
                colsPercentages={colsPercentages}
                resizable={props.resizable}
                hasCheckboxCell={!!props.selectionConfig?.renderer}
            />
            <ExternLines />
            <TableContainer>
                <Header<T>
                    columnConfigs={visibleColumns}
                    columnOrder={props.columnOrder}
                    baseHeaderClasses={props.baseHeaderClasses}
                    orderIconsConfig={props.orderIconsConfig}
                    hasSelectionConfig={!!props.selectionConfig}
                    allKeysChecked={props.allKeysChecked}
                    headerSelectionRenderer={props.selectionConfig?.headerRenderer}
                    setColumnOrder={props.setColumnOrder}
                    baseHeaderRenderer={props.headerRenderer}
                    onSelectionChange={props.onSelectionChange}
                />
                <TableBodyContainer>{renderBody()}</TableBodyContainer>
            </TableContainer>
        </TableWrapperContainer>
    );
}

const TableWrapperContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
`;

const TableContainer = styled.table`
    width: 100%;
`;

const TableBodyContainer = styled.tbody`
    width: 100%;
    display: block;
    border-collapse: collapse;
`;

export default TableFull;
