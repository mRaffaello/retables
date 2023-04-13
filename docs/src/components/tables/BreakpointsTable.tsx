import React from 'react';
import { ColumnConfig, EXTERN_LINE_GROUP, Table } from 'retables';
import { BreakpointDesc } from '@site/src/types';

const BreakpointCell = (props: { item: BreakpointDesc }) => (
    <code className='overflow-hidden'>{props.item.breakpoint}</code>
);

const PxCell = (props: { px?: number }) => (
    <div className='overflow-hidden'>
        {props.px && props.px !== Infinity ? `${props.px}px` : '-'}
    </div>
);

export const breakpointsColumn: ColumnConfig<BreakpointDesc>[] = [
    {
        title: 'Name',
        key: 'breakpoint',
        renderer: BreakpointCell,
        flex: 1.5,
        disableOrderIcon: true
    },
    {
        title: 'From',
        key: 'from',
        renderer: props => <PxCell px={props.item.from} />,
        disableOrderIcon: true
    },
    {
        title: 'To',
        key: 'to',
        renderer: props => <PxCell px={props.item.to} />,
        disableOrderIcon: true
    }
];

const breakpointData: BreakpointDesc[] = [
    { breakpoint: 'BREAKPOINT.XS', from: 0, to: 639 },
    { breakpoint: 'BREAKPOINT.SM', from: 640, to: 767 },
    { breakpoint: 'BREAKPOINT.MD', from: 768, to: 1023 },
    { breakpoint: 'BREAKPOINT.LG', from: 1024, to: 1279 },
    { breakpoint: 'BREAKPOINT.XL', from: 1280, to: 1535 },
    { breakpoint: 'BREAKPOINT.DOUBLEXL', from: 1536, to: Infinity }
];

function BreakpointsTable() {
    // Render
    return (
        <Table<BreakpointDesc>
            indexKey='breakpoint'
            columnConfigs={breakpointsColumn}
            data={breakpointData}
            baseHeaderClasses='font-bold'
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}
            gridConfig={{
                showExternLines: EXTERN_LINE_GROUP.ALL,
                showHorizontalLines: true,
                showVerticalLines: true,
                width: '1px',
                color: '#606770'
            }}
            baseRowClasses={index => {
                let baseClasses = '';
                return index % 2 !== 0 ? baseClasses : `${baseClasses} bg-gray-100 dark:bg-stripe`;
            }}
            resizable={false}
        />
    );
}

export default BreakpointsTable;
