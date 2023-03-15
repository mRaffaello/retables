import { ApiDesc } from '../types';

export const selectionProps: ApiDesc[] = [
    {
        name: 'flex',
        type: 'number',
        description: 'Horizontal weight of the selection column',
        required: true
    },
    {
        name: 'renderer',
        type: '(props: SelectionRendererProps) => JSX.Element',
        description: 'Selection renderer for every row',
        required: true
    },
    {
        name: 'initialSelection',
        type: 'any[]',
        description:
            'Array containing the list of initial selected rows. Every row will be represented by the value of its `indexKey`'
    },
    {
        name: 'headerRenderer?',
        type: '(props: SelectionHeaderRendererProps) => JSX.Element',
        description: 'Selection renderer for the header'
    }
];
