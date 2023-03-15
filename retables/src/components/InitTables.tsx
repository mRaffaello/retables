import { createContext } from 'react';
import { GlobalConfig } from '../types/table';

export const TableContext = createContext<GlobalConfig>({} as GlobalConfig);

type InitTablesProps = {
    children: React.ReactNode;
} & GlobalConfig;

function InitTables(props: InitTablesProps) {
    // Render
    return <TableContext.Provider value={{ ...props }}>{props.children}</TableContext.Provider>;
}

export default InitTables;
