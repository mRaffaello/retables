import { ApiDesc } from '../types';

export const paginationProps: ApiDesc[] = [
    {
        name: 'entryPerPage',
        type: 'number',
        description: 'Number of rows per page',
        required: true
    },
    {
        name: 'renderer',
        type: '(props: PageSelectorRendererProps) => JSX.Element',
        description: 'Renderer for the page selector component',
        required: true
    }
];
