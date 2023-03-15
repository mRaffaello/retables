import React from 'react';
import { Table } from 'retables';
import { Person, people } from '@site/src/data';
import { peopleColumns } from './columns';
import DefaultHeaderCell from './DefaultHeaderCell';
import DefaultTableCell from './DefaultTableCell';

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
            headerRenderer={DefaultHeaderCell}
            // highlight-next-line
            cellRenderer={DefaultTableCell} // Apply the default renderer to all table cells
        />
    );
}

export default CustomRenderersTable;
