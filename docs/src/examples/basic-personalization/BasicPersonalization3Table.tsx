import React from 'react';
import { Table } from 'retables';
import { Person, people } from '@site/src/data';
import { peopleColumns } from './columns';

function BasicPersonalizationTable() {
    return (
        <Table<Person>
            indexKey='id'
            data={people.slice(0, 6)}
            columnConfigs={peopleColumns}
            baseHeaderClasses='font-bold'
            baseRowClasses={index => {
                let baseClasses = 'cursor-pointer';
                return index % 2 !== 0 ? baseClasses : `${baseClasses} bg-gray-100 dark:bg-stripe`;
            }}
            // highlight-start
            // Add custom cell padding
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}
            // highlight-end
        />
    );
}

export default BasicPersonalizationTable;
