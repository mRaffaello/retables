import React from 'react';
import { SelectionRendererProps } from 'retables';

function SelectionCell(props: SelectionRendererProps) {
    return (
        <div className='flex justify-center h-full w-full'>
            <input
                type='checkbox'
                checked={props.checked}
                onChange={props.onChange}
                className='accent-violet-800 dark:accent-violet-200'
            />
        </div>
    );
}

export default SelectionCell;
