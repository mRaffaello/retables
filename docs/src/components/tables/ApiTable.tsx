import React from 'react';
import { ColumnConfig, EXTERN_LINE_GROUP, Table } from 'retables';
import { ApiDesc } from '@site/src/types';

const NameCell = (props: { item: ApiDesc }) => (
    <code className='overflow-hidden'>{props.item.name}</code>
);

const TypeCell = (props: { item: ApiDesc }) => (
    <code className='overflow-hidden'>{props.item.type}</code>
);

const DescCell = (props: { item: ApiDesc }) => (
    <div className='overflow-hidden'>
        {props.item.required ? <span className='font-bold italic'>[required] </span> : ''}
        {props.item.description}
    </div>
);

export const apiColumns: ColumnConfig<ApiDesc>[] = [
    { title: 'Name', key: 'name', renderer: NameCell, flex: 0.35 },
    { title: 'Type', key: 'type', flex: 0.5, renderer: TypeCell },
    { title: 'Description', key: 'description', renderer: DescCell }
];

type ApiTableProps = {
    data: ApiDesc[];
};

function ApiTable(props: ApiTableProps) {
    // Render
    return (
        <Table<ApiDesc>
            indexKey='name'
            columnConfigs={apiColumns}
            data={props.data}
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

export default ApiTable;
