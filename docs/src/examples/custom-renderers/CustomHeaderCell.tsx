import React from 'react';
import { ColumnHeaderCellProps } from 'retables';

function CustomHeaderCell(props: ColumnHeaderCellProps) {
    return (
        <div className='text-xs italic text-green-700 uppercase font-extrabold'>{props.title}</div>
    );
}

export default CustomHeaderCell;
