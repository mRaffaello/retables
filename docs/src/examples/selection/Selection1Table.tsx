import React from 'react';
import { Table } from 'retables';
import { Person, people } from '@site/src/data';
import SelectionCell from './SelectionCell';
import { peopleColumns } from './columns';
import SelectionHeaderCell from './SelectionHeaderCell';

function SelectionTable() {
    return (
        <Table<Person>
            indexKey='id'
            data={people.slice(0, 6)}
            columnConfigs={peopleColumns}
            baseHeaderClasses='font-bold'
            baseRowClasses={(index, isSelected) => {
                if (isSelected)
                    return 'cursor-pointer !bg-violet-200 dark:!bg-violet-800 dark:text-white';
                let baseClasses = 'cursor-pointer';
                return index % 2 !== 0 ? baseClasses : `${baseClasses} bg-gray-100 dark:bg-stripe`;
            }}
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}
            // highlight-start
            selectionConfig={{
                flex: 0.2,
                initialSelection: [0, 3],
                renderer: SelectionCell,
                headerRenderer: SelectionHeaderCell
            }}
            // highlight-end
        />
    );
}

export default SelectionTable;
