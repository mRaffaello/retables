// React
import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { TableConfig } from '../types/table';

// Components
import useOrder from '../hooks/useOrder';
import { SORT_DIRECTION } from '../types/enums';
import { getByString } from '../utils/objects';
import TableFull from './TableFull';

// Styles
import TableMin from './TableMin';
import { compareBreakpoints, getBreakpointFromWidth } from '../utils/spacing';
import { DEFAULT_BREAKPOINT } from '../config/constants';

export type TableRef = {
    getSelectedKeys: () => any[];
    getCurrentPage: () => number;
    setPage: (page: number) => void;
};

function Table<T = any>(props: TableConfig<T>, ref: Ref<TableRef>) {
    // Hooks
    const { columnOrder, setColumnOrder, getColumnOrder } = useOrder<T>();

    // State
    const [page, setPage] = useState(0);
    const [entryPerPage, setEntriesPerPage] = useState(props.paginationConfig?.entryPerPage);
    const [areColumnCollapsed, setAreColumnCollapsed] = useState(
        compareBreakpoints(
            props.breakpoint ?? DEFAULT_BREAKPOINT,
            getBreakpointFromWidth(window.innerWidth),
            true
        )
    );
    const [checkedKeys, setCheckedKeys] = useState(props.selectionConfig?.initialSelection || []);

    // References
    const checkedKeysRef = useRef<any[]>(checkedKeys);

    // Memos
    const orderedData = useMemo<T[]>(() => {
        if (columnOrder && props.data) {
            const columnIndex = columnOrder.index;
            const or = getColumnOrder(columnIndex);
            const column = props.columnConfigs!.find((_, i) => i === columnIndex)!;

            if (!column.key) return props.data;

            let ordered = [...props.data].sort((a: any, b: any) => {
                if (column?.compare) return column.compare(a, b);
                if (getByString(a, column.key as string) < getByString(b, column.key as string))
                    return 1;
                else if (
                    getByString(a, column.key as string) > getByString(b, column.key as string)
                )
                    return -1;
                return 0;
            });

            if (or === SORT_DIRECTION.ASC) ordered = ordered.reverse();

            return ordered;
        } else if (props.data) return props.data;

        return [];
    }, [props.columnConfigs, columnOrder, props.data]);

    const paginatedData = useMemo<T[]>(() => {
        return entryPerPage
            ? orderedData.slice(entryPerPage * page, entryPerPage * (page + 1))
            : orderedData;
    }, [orderedData, page, entryPerPage]);

    const allKeysChecked = useMemo(() => {
        if (!paginatedData.length) return false;
        const allKeys = paginatedData.map(p => getByString(p, props.indexKey));
        return allKeys.every(v => checkedKeys.includes(v));
    }, [paginatedData, checkedKeys]);

    // Methods
    const onSelectionChange = (key: any, globalSwitch?: boolean) => {
        if (globalSwitch !== undefined) {
            checkedKeysRef.current = globalSwitch
                ? paginatedData.map(p => getByString(p, props.indexKey))
                : [];
        } else {
            if (checkedKeysRef.current.includes(key))
                checkedKeysRef.current = checkedKeysRef.current.filter(k => k !== key);
            else checkedKeysRef.current = [...checkedKeysRef.current, key];
        }
        setCheckedKeys([...checkedKeysRef.current]);
    };

    const changePage = (nextPage: number) => {
        if (page !== nextPage) {
            setPage(nextPage);
            setCheckedKeys([]);
            checkedKeysRef.current = [];
        }
    };

    const changeEntriesPerPage = (nextEntriesPerPage: number) => {
        setPage(0);
        setCheckedKeys([]);
        checkedKeysRef.current = [];
        setEntriesPerPage(nextEntriesPerPage);
    };

    // Handles
    useImperativeHandle(ref, () => ({
        getSelectedKeys: () => checkedKeys,
        getCurrentPage: () => page,
        setPage: (page: number) => {
            setPage(page);
            setCheckedKeys([]);
            checkedKeysRef.current = [];
        }
    }));

    // Effects
    useEffect(() => {
        setPage(0);
    }, [columnOrder]);

    // Methods
    const calcInnerWidth = () => {
        const isCollapsed = compareBreakpoints(
            props.breakpoint ?? DEFAULT_BREAKPOINT,
            getBreakpointFromWidth(window.innerWidth),
            true
        );
        setAreColumnCollapsed(isCollapsed);
    };

    // Effects
    useEffect(() => {
        window.addEventListener('resize', calcInnerWidth);
        return () => window.removeEventListener('resize', calcInnerWidth);
    }, []);

    // Render
    return (
        <>
            {areColumnCollapsed ? (
                <TableMin
                    {...props}
                    data={props.data ? paginatedData : undefined}
                    columnConfigs={props.columnConfigs}
                    columnOrder={columnOrder}
                    orderIconsConfig={props.orderIconsConfig}
                    checkedKeys={checkedKeys}
                    setColumnOrder={setColumnOrder}
                    onCellPress={props.onCellPress}
                    onSelectionChange={onSelectionChange}
                />
            ) : (
                <TableFull
                    {...props}
                    data={props.data ? paginatedData : undefined}
                    columnConfigs={props.columnConfigs}
                    columnOrder={columnOrder}
                    orderIconsConfig={props.orderIconsConfig}
                    checkedKeys={checkedKeys}
                    setColumnOrder={setColumnOrder}
                    onCellPress={props.onCellPress}
                    onSelectionChange={onSelectionChange}
                    allKeysChecked={allKeysChecked}
                />
            )}
            {entryPerPage && props.paginationConfig?.renderer && props.data?.length ? (
                <props.paginationConfig.renderer
                    nPages={
                        props.data.length % entryPerPage === 0
                            ? props.data.length / entryPerPage
                            : Math.trunc(props.data.length / entryPerPage) + 1
                    }
                    entryPerPage={entryPerPage}
                    currentPage={page}
                    setPage={changePage}
                    setEntriesPerPage={changeEntriesPerPage}
                />
            ) : (
                <div />
            )}
        </>
    );
}

export default forwardRef(Table) as <T extends unknown>(
    props: TableConfig<T> & {
        ref?: Ref<TableRef>;
    }
) => JSX.Element;
