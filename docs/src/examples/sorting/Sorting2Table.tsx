import React from 'react';
import { Table } from 'retables';
import { Person, people } from '@site/src/data';
import { disableSortColumns } from './columns';

function SortingTable() {
    return (
        <Table<Person>
            indexKey='id'
            data={people.slice(0, 6)}
            columnConfigs={disableSortColumns}
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

export default SortingTable;
