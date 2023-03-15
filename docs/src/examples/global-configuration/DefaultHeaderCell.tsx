import React from 'react';
import { DefaultHeaderCellProps } from 'retables';

function DefaultHeaderCell(props: DefaultHeaderCellProps) {
    return (
        <div className='text-xs text-gray-700 uppercase font-extrabold dark:text-gray-400'>
            {props.title}
        </div>
    );
}

export default DefaultHeaderCell;
