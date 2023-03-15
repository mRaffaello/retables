import { ColumnConfig } from 'retables';
import { Person } from '@site/src/data';
import CustomHeaderCell from './CustomHeaderCell';
import DoubleTableCell from './DoubleTableCell';

export const peopleColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.5 },
    { title: 'Last name', key: 'about.lastName' },
    { title: 'Age', key: 'about.age', flex: 0.5 },
    { title: 'Job', key: 'about.job', flex: 1.5 },
    { title: 'Company', key: 'company', flex: 1.5 }
];

export const customHeaderColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.5 },
    // highlight-next-line
    { title: 'Last name', key: 'about.lastName', headerRenderer: CustomHeaderCell },
    { title: 'Age', key: 'about.age', flex: 0.5 },
    { title: 'Job', key: 'about.job', flex: 1.5 },
    { title: 'Company', key: 'company', flex: 1.5 }
];

export const customCellColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.5 },
    // highlight-next-line
    { title: 'Name', key: 'about.lastName', renderer: DoubleTableCell },
    { title: 'Age', key: 'about.age', flex: 0.5 },
    { title: 'Job', key: 'about.job', flex: 1.5 },
    { title: 'Company', key: 'company', flex: 1.5 }
];
