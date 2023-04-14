import { SKELETON_DEFAULTS } from '../config/constants';
import { NestedKeyOf } from '../types/structs';
import { ColumnOrder, TableConfig } from '../types/table';
import { getByString } from '../utils/objects';
import RowMin from './RowMin';
import SkeletonMinRow from './SkeletonMinRow';
import styled from '@emotion/styled';
import ExternLines from './ExternLines';

type TableMinProps<T> = {
    checkedKeys: any[];
    columnOrder?: ColumnOrder;
    setColumnOrder: (key: NestedKeyOf<T>) => void;
    onSelectionChange: (key: any) => void;
} & TableConfig<T>;

function TableMin<T = any>(props: TableMinProps<T>) {
    // Methods
    const renderRows = () =>
        props.data!.map((d, i) => (
            <RowMin<T>
                key={String(getByString(d, props.indexKey) ?? i)}
                indexTable={i}
                indexKey={props.indexKey}
                data={d}
                columnConfigs={props.columnConfigs}
                baseRowClasses={props.baseRowClasses}
                baseHeaderClasses={props.baseHeaderClasses}
                defaultChecked={props.checkedKeys.includes(getByString(d, props.indexKey))}
                cellRenderer={props.cellRenderer}
                baseHeaderRenderer={props.headerRenderer}
                onCellPress={props.onCellPress}
                onSelectionChange={props.onSelectionChange}
            />
        ));

    const renderSkeletonRows = () =>
        Array(props.skeletonConfig?.rows || SKELETON_DEFAULTS.ROWS)
            .fill(0)
            .map((_, i) => (
                <SkeletonMinRow<T>
                    key={i}
                    indexTable={i}
                    columnConfigs={props.columnConfigs}
                    baseRowClasses={props.baseRowClasses}
                    baseHeaderClasses={props.baseHeaderClasses}
                    skeletonConfig={props.skeletonConfig!}
                    baseHeaderRenderer={props.headerRenderer}
                />
            ));

    const renderBody = () => {
        if (!props.data && props.skeletonConfig) return renderSkeletonRows();
        else if (props.data) return renderRows();
        else return <></>;
    };

    // Render
    return (
        <TableWrapperContainer>
            <ExternLines />
            <TableContainer className={props.className}>{renderBody()}</TableContainer>
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
    display: block;
    border-collapse: collapse;
`;

export default TableMin;
