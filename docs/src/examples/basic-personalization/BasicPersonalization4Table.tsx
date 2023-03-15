import React from 'react';
import { EXTERN_LINE_GROUP, Table } from 'retables';
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
                let baseClasses = 'text-sm cursor-pointer';
                return index % 2 !== 0 ? baseClasses : `${baseClasses} bg-gray-100 dark:bg-stripe`;
            }}
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}
            // highlight-start
            // Add custom grid config
            gridConfig={{
                showExternLines: EXTERN_LINE_GROUP.NONE,
                showHorizontalLines: true,
                showVerticalLines: false,
                color: '#606770'
            }}
            // highlight-end
        />
    );
}

export default BasicPersonalizationTable;
