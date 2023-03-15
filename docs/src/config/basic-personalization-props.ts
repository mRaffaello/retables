import { ApiDesc } from '../types';

export const baseTableProps: ApiDesc[] = [
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
    }
];

export const baseCellPaddingProps: ApiDesc[] = [
    {
        name: 'horizontal',
        type: 'string | ((breakpoint: BREAKPOINT) => string)',
        description: 'Padding vertical for every table cell, including headers'
    },
    {
        name: 'vertical',
        type: 'string | ((breakpoint: BREAKPOINT) => string)',
        description: 'Padding horizontal for every table cell, including headers'
    }
];

export const gridConfigProps: ApiDesc[] = [
    { name: 'width', type: 'string', description: 'Width of all borders' },
    { name: 'color', type: 'string', description: 'Color of all borders' },
    { name: 'hoverColor', type: 'string', description: 'Hover color of resizable borders' },
    { name: 'showVerticalLines', type: 'boolean', description: 'Show inner vertical lines' },
    { name: 'showHorizontalLines', type: 'boolean', description: 'Show inner horizontal lines' },
    {
        name: 'showExternLines',
        type: 'EXTERN_LINE[]',
        description: 'Set external table lines to be displayed'
    }
];
