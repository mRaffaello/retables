import React from 'react';
import { DefaultCellRendererProps } from 'retables';

function DefaultTableCell(props: DefaultCellRendererProps) {
    return <div className='text-center'>{props.text}</div>;
}

export default DefaultTableCell;
