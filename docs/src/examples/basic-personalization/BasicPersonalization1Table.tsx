import React from 'react';
import { Person, people } from '@site/src/data';
import { Table } from 'retables';
import { peopleColumns } from './columns';

function BasicPersonalizationTable() {
    return (
        <Table<Person>
            indexKey='id'
            data={people.slice(0, 3)}
            columnConfigs={peopleColumns}
            // highlight-start
            className='cursor-pointer' // Change the cursor when hovering on the table
            baseHeaderClasses='font-bold bg-gray-100 dark:bg-stripe' // Assign background to the header
            baseRowClasses='py-2' // Apply a base vertical padding
            // highlight-end
        />
    );
}

export default BasicPersonalizationTable;
