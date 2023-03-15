import React from 'react';
import { Person } from '@site/src/data';
import { ColumnCellRendererProps } from 'retables';

function DoubleTableCell(props: ColumnCellRendererProps<Person>) {
    return (
        <div className='whitespace-nowrap w-full overflow-hidden overflow-ellipsis'>
            <div className='font-semibold'>{props.item.about.lastName}</div>
            <div className='opacity-60'>{props.item.about.firstName}</div>
        </div>
    );
}

export default DoubleTableCell;
