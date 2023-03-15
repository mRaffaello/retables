import { ApiDesc } from '../types';

export const globalProps: ApiDesc[] = [
    {
        name: 'breakpoint',
        type: 'BREAKPOINT',
        description: 'Width breakpoint from mobile table and full size table'
    },
    {
        name: 'className',
        type: 'string',
        description: 'Classes that will be applied to the <table /> tag'
    },
    {
        name: 'baseHeaderClasses',
        type: 'string',
        description: 'Classes that will be applied to the header'
    },
    {
        name: 'baseRowClasses',
        type: 'string | ((index: number, isSelected?: boolean) => string)',
        description:
            'Classes that will be applied to every row. You can also have different styling based on the row index or its selection status'
    },
    {
        name: 'baseCellPadding',
        type: 'CellPadding',
        description: 'Default padding for each table cell, including headers'
    },
    {
        name: 'resizable',
        type: 'boolean',
        description: 'Enable column drag resize'
    },
    {
        name: 'gridConfig',
        type: 'GridConfig',
        description:
            'Defines which grid lines needs to be rendered. Contains also grid related personalization options'
    },
    {
        name: 'paginationConfig',
        type: 'PaginationConfig',
        description: 'Pagination options. If undefined, no pagination will be applied'
    },
    {
        name: 'orderIconsConfig',
        type: 'OrderIconsConfig',
        description: 'Define custom header order icons'
    },
    {
        name: 'skeletonConfig',
        type: 'SkeletonConfig',
        description:
            'Skeleton row configuration. Skeleton rows will be displayed when the `data` prop on <Table /> is undefined'
    },
    {
        name: 'headerRenderer',
        type: '(props: DefaultHeaderCellProps) => JSX.Element',
        description: 'Default renderer for every header cell'
    },
    {
        name: 'cellRenderer',
        type: '(props: DefaultCellRendererProps) => JSX.Element',
        description: 'Default renderer for every table cell'
    }
];
