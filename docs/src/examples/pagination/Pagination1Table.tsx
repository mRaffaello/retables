import React from 'react';
import { Table } from 'retables';
import { Person, people } from '@site/src/data';
import { peopleColumns } from './columns';
import PageSelector from './PageSelector';

function ResponsivenessTable() {
    return (
        <Table<Person>
            indexKey='id'
            data={people}
            columnConfigs={peopleColumns}
            baseHeaderClasses='font-bold'
            baseRowClasses={index => {
                let baseClasses = 'cursor-pointer';
                return index % 2 !== 0 ? baseClasses : `${baseClasses} bg-gray-100 dark:bg-stripe`;
            }}
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}
            // highlight-start
            paginationConfig={{
                entryPerPage: 5,
                renderer: PageSelector
            }}
            // highlight-end
        />
    );
}

export default ResponsivenessTable;
