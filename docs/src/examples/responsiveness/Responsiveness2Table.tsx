import React from 'react';
import { BREAKPOINT, Table } from 'retables';
import { Person, people } from '@site/src/data';
import { peopleColumns } from './columns';

function ResponsivenessTable() {
    return (
        <Table<Person>
            indexKey='id'
            // highlight-next-line
            breakpoint={BREAKPOINT.DOUBLEXL}
            data={people.slice(0, 6)}
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
        />
    );
}

export default ResponsivenessTable;
