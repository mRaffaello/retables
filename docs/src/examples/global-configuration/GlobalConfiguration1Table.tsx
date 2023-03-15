import React from 'react';
import { Person, people } from '@site/src/data';
import { Table } from 'retables';
import { peopleColumns } from './columns';

function GlobalConfigurationTable() {
    // Render
    return <Table<Person> indexKey='id' data={people.slice(0, 3)} columnConfigs={peopleColumns} />;
}

export default GlobalConfigurationTable;
