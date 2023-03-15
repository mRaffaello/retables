import styled from '@emotion/styled';
import { NestedKeyOf } from '../types/structs';
import { ColumnConfig } from '../types/table';
import { getByString } from '../utils/objects';

type CellProps<T> = {
    item: T;
    columnKey: NestedKeyOf<T>;
    rowIndex: number;
    columnRenderer?: ColumnConfig<T>['renderer'];
    cellRenderer?: (props: { text: any; rowIndex: number }) => JSX.Element;
};

function Cell<T = any>(props: CellProps<T>) {
    // Props
    const { columnKey, item, rowIndex } = props;

    // Methods
    const renderCell = () => {
        if (props.columnRenderer) return <props.columnRenderer item={item} rowIndex={rowIndex} />;
        else if (props.cellRenderer)
            return (
                <props.cellRenderer
                    text={getByString(item, columnKey as string)}
                    rowIndex={rowIndex}
                />
            );
        else
            return (
                <DefaultCellContainer>
                    {getByString(item, columnKey as string)}
                </DefaultCellContainer>
            );
    };
    // Render
    return renderCell();
}

const DefaultCellContainer = styled.div`
    text-align: left;
`;

export default Cell;
