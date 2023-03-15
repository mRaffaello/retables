import React from 'react';
import { Table } from 'retables';
import DefaultHeaderCell from './DefaultHeaderCell';
import { Person, people } from '@site/src/data';
import { peopleColumns } from './columns';

function CustomRenderersTable() {
    return (
        <Table<Person>
            indexKey='id'
            data={people.slice(0, 6)}
            columnConfigs={peopleColumns}
            baseRowClasses={index => {
                let baseClasses = 'cursor-pointer';
                return index % 2 !== 0 ? baseClasses : `${baseClasses} bg-gray-100 dark:bg-stripe`;
            }}
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}
            // highlight-next-line
            headerRenderer={DefaultHeaderCell} // Apply the default renderer to all header cells
        />
    );
}

export default CustomRenderersTable;
