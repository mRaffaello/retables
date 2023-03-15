// React
import {
    createContext,
    forwardRef,
    memo,
    Ref,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from 'react';

// Components
import Table, { TableRef } from './Table';

// Types
import { TableConfig } from '../types/table';

// Others
import { TableContext } from './InitTables';
import { deepEqual } from 'fast-equals';
import { generateTableCssVariable, setCssVariable } from '../utils/css';
import { CSS_VARIABLE, EXTERN_LINE } from '../types/enums';
import { GRID_DEFALTS } from '../config/constants';
import {
    compareBreakpoints,
    getBreakpointFromWidth,
    getColsPercentages,
    setColsPercentagesVariables
} from '../utils/spacing';
import { generateRandomString } from '../utils/random';
import { getExternLines } from '../utils/table';

type TableIdContextType = {
    getTableId: () => string;
};

type OverridableTableConfig<T> = Omit<TableConfig<T>, 'data' | 'indexKey'>;

export const TableIdContext = createContext<TableIdContextType>({} as TableIdContextType);

export type TableWrapperRef<T> = {
    setTableConfig: (config: OverridableTableConfig<T>) => void;
} & TableRef;

function TableWrapper<T>(props: TableConfig<T>, ref: Ref<TableWrapperRef<T>>) {
    // Hooks
    const globalConfig = useContext(TableContext);

    // State
    const [configOverride, setConfigOverride] = useState<OverridableTableConfig<T>>();

    // References
    const tableRef = useRef<TableRef>(null);
    const tableIdRef = useRef(generateRandomString(6));

    // Memos
    const config = useMemo<TableConfig<T>>(() => {
        return configOverride
            ? {
                  ...globalConfig,
                  ...props,
                  ...configOverride
              }
            : {
                  ...globalConfig,
                  ...props
              };
    }, [configOverride, props.data]);

    // Methods
    const getTableId = () => tableIdRef.current;

    const setTableColumns = () => {
        const breakpoint = getBreakpointFromWidth(window.innerWidth);
        const visibleColumns = props.columnConfigs.filter(c =>
            c.showAt ? compareBreakpoints(breakpoint, c.showAt) : true
        );

        // Cols percentages
        const colsPercentages = getColsPercentages(
            visibleColumns,
            config.selectionConfig?.flex,
            config.optionsCell?.flex
        );
        setColsPercentagesVariables(tableIdRef.current, colsPercentages);
    };

    const updateCellPaddingOnBreakpoint = () => {
        const breakpoint = getBreakpointFromWidth(window.innerWidth);

        // Update cell padding
        if (config.baseCellPadding) {
            const { horizontal, vertical } = config.baseCellPadding;
            if (typeof horizontal !== 'string' && horizontal !== undefined) {
                setCssVariable(
                    tableIdRef.current,
                    generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_HORIZONTAL),
                    horizontal(breakpoint)
                );
            }
            if (typeof vertical !== 'string' && vertical !== undefined) {
                setCssVariable(
                    tableIdRef.current,
                    generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_VERTICAL),
                    vertical(breakpoint)
                );
            }
        }
    };

    // Handles
    useImperativeHandle(ref, () => ({
        setTableConfig: (config: OverridableTableConfig<T>) => setConfigOverride(config),
        getSelectedKeys: () => tableRef.current?.getSelectedKeys() || [],
        getCurrentPage: () => tableRef.current?.getCurrentPage() ?? -1,
        setPage: (page: number) => tableRef.current?.setPage(page)
    }));

    // Effects
    useEffect(() => {
        // Cols percentages
        setTableColumns();

        // Cell padding
        if (typeof config.baseCellPadding?.horizontal === 'string')
            setCssVariable(
                tableIdRef.current,
                generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_HORIZONTAL),
                config.baseCellPadding.horizontal
            );

        if (typeof config.baseCellPadding?.vertical === 'string')
            setCssVariable(
                tableIdRef.current,
                generateTableCssVariable(CSS_VARIABLE.CELL_PADDING_VERTICAL),
                config.baseCellPadding.vertical
            );

        updateCellPaddingOnBreakpoint();

        // Grid color
        if (config.gridConfig?.color)
            setCssVariable(
                tableIdRef.current,
                generateTableCssVariable(CSS_VARIABLE.GRID_COLOR),
                config.gridConfig.color
            );

        // Grid width
        const lines = getExternLines(
            config.gridConfig?.showExternLines ?? GRID_DEFALTS.EXTERN_LINES
        );

        const showInnerHorizontalLines =
            config.gridConfig?.showHorizontalLines === undefined ||
            config.gridConfig.showHorizontalLines;
        const showInnerVertiacalLines =
            config.gridConfig?.showVerticalLines === undefined ||
            config.gridConfig.showVerticalLines;

        setCssVariable(
            tableIdRef.current,
            generateTableCssVariable(CSS_VARIABLE.GRID_WIDTH_HORIZONTAL),
            showInnerHorizontalLines ? config.gridConfig?.width ?? `${GRID_DEFALTS.WIDTH}px` : '0px'
        );

        setCssVariable(
            tableIdRef.current,
            generateTableCssVariable(CSS_VARIABLE.GRID_WIDTH_VERTICAL),
            showInnerVertiacalLines ? config.gridConfig?.width ?? `${GRID_DEFALTS.WIDTH}px` : '0px'
        );

        lines.includes(EXTERN_LINE.TOP) &&
            setCssVariable(
                tableIdRef.current,
                generateTableCssVariable(CSS_VARIABLE.GRID_WIDTH_TOP),
                config.gridConfig?.width ?? `${GRID_DEFALTS.WIDTH}px`
            );

        lines.includes(EXTERN_LINE.BOTTOM) &&
            setCssVariable(
                tableIdRef.current,
                generateTableCssVariable(CSS_VARIABLE.GRID_WIDTH_BOTTOM),
                config.gridConfig?.width ?? `${GRID_DEFALTS.WIDTH}px`
            );

        lines.includes(EXTERN_LINE.LEFT) &&
            setCssVariable(
                tableIdRef.current,
                generateTableCssVariable(CSS_VARIABLE.GRID_WIDTH_LEFT),
                config.gridConfig?.width ?? `${GRID_DEFALTS.WIDTH}px`
            );

        lines.includes(EXTERN_LINE.RIGHT) &&
            setCssVariable(
                tableIdRef.current,
                generateTableCssVariable(CSS_VARIABLE.GRID_WIDTH_RIGHT),
                config.gridConfig?.width ?? `${GRID_DEFALTS.WIDTH}px`
            );

        // Grid hover color
        if (config.gridConfig?.hoverColor)
            setCssVariable(
                tableIdRef.current,
                generateTableCssVariable(CSS_VARIABLE.GRID_HOVER_COLOR),
                config.gridConfig.hoverColor
            );
    }, [config]);

    // Effects
    useEffect(() => {
        window.addEventListener('resize', updateCellPaddingOnBreakpoint);
        return () => window.removeEventListener('resize', updateCellPaddingOnBreakpoint);
    }, [config.baseCellPadding]);

    // Render
    return (
        <div id={tableIdRef.current}>
            <TableIdContext.Provider value={{ getTableId }}>
                <Table<T> ref={tableRef} {...config} />
            </TableIdContext.Provider>
        </div>
    );
}

const ref = forwardRef(TableWrapper) as <T extends unknown>(
    props: TableConfig<T> & { ref?: Ref<TableWrapperRef<T>> }
) => JSX.Element;

export default memo(ref, (p, n) => {
    return deepEqual(p.data, n.data);
}) as typeof ref;
