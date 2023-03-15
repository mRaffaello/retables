import React from 'react';
import { Table } from 'retables';
import { Person, people } from '@site/src/data';
import { customCellColumns } from './columns';
import DefaultHeaderCell from './DefaultHeaderCell';
import DefaultTableCell from './DefaultTableCell';

function CustomRenderersTable() {
    return (
        <Table<Person>
            indexKey='id'
            data={people.slice(0, 6)}
            // highlight-next-line
            columnConfigs={customCellColumns} // use the updated columns config
            baseRowClasses={index => {
                let baseClasses = 'cursor-pointer';
                return index % 2 !== 0 ? baseClasses : `${baseClasses} bg-gray-100 dark:bg-stripe`;
            }}
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}
            headerRenderer={DefaultHeaderCell}
            cellRenderer={DefaultTableCell}
        />
    );
}

export default CustomRenderersTable;
