import { ColumnConfig } from 'retables';
import { Person } from '@site/src/data';

export const peopleColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.5 },
    { title: 'Last name', key: 'about.lastName' },
    { title: 'Job', key: 'about.job', flex: 1.5 },
    { title: 'Company', key: 'company', flex: 1.5 }
];
