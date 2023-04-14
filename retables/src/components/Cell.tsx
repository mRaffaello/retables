import styled from '@emotion/styled';
import { NestedKeyOfWithOptionals } from '../types/structs';
import { ColumnConfig } from '../types/table';
import { getByString } from '../utils/objects';

type CellProps<T> = {
    item: T;
    rowIndex: number;
    columnKey?: NestedKeyOfWithOptionals<T>;
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
                    text={columnKey ? getByString(item, columnKey as string) : undefined}
                    rowIndex={rowIndex}
                />
            );
        else
            return (
                <DefaultCellContainer>
                    {columnKey ? getByString(item, columnKey as string) : undefined}
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
