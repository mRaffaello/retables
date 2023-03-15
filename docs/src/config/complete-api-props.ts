import { ApiDesc } from '../types';

export const tableProps: ApiDesc[] = [
    {
        name: 'indexKey',
        type: 'NestedKeyOf<T>',
        description: 'Key that contains a unique value for each row object',
        required: true
    },
    {
        name: 'data',
        type: 'T[]',
        description: 'Array of objects to be displayed'
    },
    {
        name: 'columnConfigs',
        type: 'ColumnConfig<T>[]',
        description: 'Defines which column should be displayed',
        required: true
    },
    {
        name: 'optionsCell',
        type: 'OptionsCell',
        description: 'Table cell renderered at the end of each row'
    },
    {
        name: 'selectionConfig',
        type: 'SelectionConfig',
        description:
            'Table cell renderered at the start of each row. Should be used for defining selectors'
    },
    {
        name: 'onCellPress',
        type: '(item: T, key: NestedKeyOf<T>) => any;',
        description: 'Callback for every click inside a table cell'
    }
];

export const columnProps: ApiDesc[] = [
    {
        name: 'title',
        type: 'string',
        description: 'Title for the header',
        required: true
    },
    {
        name: 'key',
        type: 'NestedKeyOf<T>',
        description:
            'Key of the object T that contains the value to be rendered inside the column cells. This is used also by default for sorting'
    },
    {
        name: 'flex',
        type: 'number',
        description: 'Horizontal weight of the selection column'
    },
    {
        name: 'showAt',
        type: 'BREAKPOINT',
        description: 'If not undefined, hides column before the specified breakpoint'
    },
    {
        name: 'disableOrderIcon',
        type: 'boolean',
        description: 'Disable header order icon'
    },
    {
        name: 'headerRenderer',
        type: '(props: ColumnHeaderCellProps) => JSX.Element',
        description: 'Custom header renderer for the column. Overrides the default table renderer'
    },
    {
        name: 'renderer',
        type: '(props: ColumnCellRendererProps<T>) => JSX.Element',
        description:
            'Custom renderer for the cells of the column. Overrides the default table renderer'
    },
    {
        name: 'compare',
        type: '(a: T, b: T) => -1 | 0 | 1',
        description: 'Custom compare function used for sorting'
    }
];

export const skeletonProps: ApiDesc[] = [
    {
        name: 'rows',
        type: 'number',
        description: 'Number of skeleton rows to display'
    },
    {
        name: 'renderer',
        type: '() => JSX.Element',
        description: 'Skeleton cell renderer',
        required: true
    }
];

export const orderIconsConfig: ApiDesc[] = [
    {
        name: '[SORT_DIRECTION.ASC]',
        type: '() => JSX.Element',
        description: 'Renderer for ASC icon'
    },
    {
        name: '[SORT_DIRECTION.DESC]',
        type: '() => JSX.Element',
        description: 'Renderer for DESC icon'
    },
    {
        name: '[SORT_DIRECTION.INITIAL]',
        type: '() => JSX.Element',
        description: 'Renderer for INITIAL icon'
    }
];

export const optionsCell: ApiDesc[] = [
    {
        name: 'flex',
        type: 'number',
        description: 'Horizontal weight of the options column',
        required: true
    },
    {
        name: 'renderer',
        type: '(props: any) => JSX.Element',
        description: 'Options renderer for every row',
        required: true
    }
];

export const columnOrder: ApiDesc[] = [
    {
        name: 'key',
        type: 'NestedKeyOf<T>',
        description: 'Object key of T',
        required: true
    },
    {
        name: 'direction',
        type: 'SORT_DIRECTION',
        description: 'Direction order',
        required: true
    }
];
