import React from 'react';
import { ColumnConfig, EXTERN_LINE_GROUP, Table } from 'retables';
import { CompareFunctionDesc } from '@site/src/types';

const ReturnCell = (props: { item: CompareFunctionDesc }) => (
    <code className='overflow-hidden'>{props.item.returnValue}</code>
);

export const compareFunctionColumns: ColumnConfig<CompareFunctionDesc>[] = [
    { title: 'Return', key: 'returnValue', renderer: ReturnCell, flex: 0.5 },
    { title: 'Description', key: 'description' }
];

const data: CompareFunctionDesc[] = [
    { returnValue: 0, description: 'when a === b' },
    { returnValue: 1, description: 'when a > b' },
    { returnValue: -1, description: 'when a < b' }
];

function CompareFunctionTable() {
    // Render
    return (
        <Table<CompareFunctionDesc>
            indexKey='returnValue'
            columnConfigs={compareFunctionColumns}
            data={data}
            baseHeaderClasses='font-bold'
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}
            gridConfig={{
                showExternLines: EXTERN_LINE_GROUP.ALL,
                showHorizontalLines: true,
                showVerticalLines: true,
                width: '1px',
                color: '#606770'
            }}
            baseRowClasses={index => {
                let baseClasses = '';
                return index % 2 !== 0 ? baseClasses : `${baseClasses} bg-gray-100 dark:bg-stripe`;
            }}
        />
    );
}

export default CompareFunctionTable;
