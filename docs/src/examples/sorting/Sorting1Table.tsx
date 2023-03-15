import React from 'react';
import { Table } from 'retables';
import { Person, people } from '@site/src/data';
import { peopleColumns } from './columns';

function SortingTable() {
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
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}
            // highlight-start
            // Add custom order icons config
            orderIconsConfig={{
                ASC: () => <p className='h-2 w-4 mr-1 cursor-pointer'>🍎</p>,
                DESC: () => <p className='h-2 w-4 mr-1 cursor-pointer'>🍐</p>,
                INITIAL: () => <p className='h-2 w-4 mr-1 cursor-pointer'>🍋</p>
            }}
            // highlight-end
        />
    );
}

export default SortingTable;
