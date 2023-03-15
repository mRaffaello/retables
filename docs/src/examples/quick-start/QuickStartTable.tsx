import React from 'react';
import { Table } from 'retables';
import { people, Person } from '@site/src/data';
import { peopleColumns } from './columns';

function QuickStartTable() {
    return (
        <Table<Person>
            indexKey='id'
            data={people.slice(0, 3)}
            columnConfigs={peopleColumns}
            baseHeaderClasses='font-bold bg-gray-100 dark:bg-stripe'
            baseCellPadding={{
                horizontal: '10px',
                vertical: '10px'
            }}
        />
    );
}

export default QuickStartTable;
