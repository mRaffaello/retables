import React from 'react';
import GlobalConfigurationTable from './GlobalConfiguration1Table';
import { BREAKPOINT, InitTables } from 'retables';
import DefaultHeaderCell from './DefaultHeaderCell';
import DefaultTableCell from './DefaultTableCell';

function App() {
    return (
        <InitTables
            breakpoint={BREAKPOINT.SM}
            headerRenderer={DefaultHeaderCell}
            cellRenderer={DefaultTableCell}
            baseRowClasses='cursor-pointer'
            baseCellPadding={{
                vertical: '10px',
                horizontal: '10px'
            }}>
            <GlobalConfigurationTable />
        </InitTables>
    );
}

export default App;
