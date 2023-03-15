import { ColumnConfig } from 'retables';
import { Person } from '@site/src/data';

export const peopleColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.5 },
    { title: 'Last name', key: 'about.lastName' },
    { title: 'Age', key: 'about.age', flex: 0.5 },
    { title: 'Job', key: 'about.job', flex: 1.5 },
    { title: 'Company', key: 'company', flex: 1.5 }
];

export const disableSortColumns: ColumnConfig<Person>[] = [
    // highlight-next-line
    { title: 'Id', key: 'id', flex: 0.5, disableOrderIcon: true },
    { title: 'Last name', key: 'about.lastName' },
    { title: 'Age', key: 'about.age', flex: 0.5 },
    // highlight-next-line
    { title: 'Job', key: 'about.job', flex: 1.5, disableOrderIcon: true },
    { title: 'Company', key: 'company', flex: 1.5 }
];

export const customCompareColumns: ColumnConfig<Person>[] = [
    { title: 'Id', key: 'id', flex: 0.5 },
    { title: 'Last name', key: 'about.lastName' },
    { title: 'Age', key: 'about.age', flex: 0.5 },
    {
        title: 'Job',
        key: 'about.job',
        flex: 1.5,
        // highlight-start
        compare: (a, b) => {
            const isAExecutive = a.about.job.toLowerCase().includes('executive');
            const isBExecutive = b.about.job.toLowerCase().includes('executive');
            if (isAExecutive && !isBExecutive) return -1;
            if (isBExecutive && !isAExecutive) return 1;
            return 0;
        }
        // highlight-end
    },
    { title: 'Company', key: 'company', flex: 1.5 }
];
