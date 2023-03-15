import React from 'react';
import { Table } from 'retables';
import { Person, people } from '@site/src/data';
import { peopleColumns } from './columns';

function BasicPersonalizationTable() {
    return (
        <Table<Person>
            indexKey='id'
            data={people.slice(0, 3)}
            columnConfigs={peopleColumns}
            className='cursor-pointer'
            baseHeaderClasses='font-bold'
            // highlight-start
            // Apply custom classes based on the row index
            baseRowClasses={index => {
                let baseClasses = 'py-2';
                return index % 2 !== 0 ? baseClasses : `${baseClasses} bg-gray-100 dark:bg-stripe`;
            }}
            // highlight-end
        />
    );
}

export default BasicPersonalizationTable;
