import { BREAKPOINT, EXTERN_LINE, EXTERN_LINE_GROUP, SORT_DIRECTION } from './enums';
import { NestedKeyOf } from './structs';

export type GlobalConfig = {
    /** Width breakpoint from mobile table and full size table */
    breakpoint?: BREAKPOINT;
    /** Classes that will be applied to the <table /> tag */
    className?: string;
    /** Classes that will be applied to the header */
    baseHeaderClasses?: string;
    /** Classes that will be applied to every row. You can also have different styling based on the row index or its selection status */
    baseRowClasses?: string | ((index: number, isSelected?: boolean) => string);
    /** Enable column drag resize */
    resizable?: boolean;
    /** Default padding for each table cell, including headers */
    baseCellPadding?: CellPadding;
    /** Defines which grid lines needs to be rendered. Contains also grid related personalization options */
    gridConfig?: GridConfig;
    /** Pagination options. If undefined, no pagination will be applied */
    paginationConfig?: PaginationConfig;
    /** Define custom header order icons */
    orderIconsConfig?: OrderIconsConfig;
    /** Skeleton row configuration. Skeleton rows will be displayed when the `data` prop on <Table /> is undefined */
    skeletonConfig?: SkeletonConfig;
    /** Default renderer for every header cell */
    headerRenderer?: (props: DefaultHeaderCellProps) => JSX.Element;
    /** Default renderer for every table cell */
    cellRenderer?: (props: DefaultCellRendererProps) => JSX.Element;
};

export type TableConfig<T> = {
    /** Array of objects to be displayed */
    data?: T[];
    /** Key that contains a unique value for each row object */
    indexKey: NestedKeyOf<T>;
    /** Defines which column should be displayed */
    columnConfigs: ColumnConfig<T>[];
    /** Table cell renderered at the end of each row */
    optionsCell?: OptionsCell<T>;
    /** Table cell renderered at the start of each row. Should be used for defining selectors */
    selectionConfig?: SelectionConfig;
    /** Callback for every click inside a table cell */
    onCellPress?: (item: T, key: NestedKeyOf<T>) => any;
} & GlobalConfig;

export type ColumnConfig<T = any> = {
    /** Title for the header */
    title: string;
    /** Key of the object T that contains the value to be rendered inside the column cells. This is used also by default for sorting */
    key: NestedKeyOf<T>;
    /** Horizontal weight of the selection column */
    flex?: number;
    /** If not undefined, hides column before the specified breakpoint */
    showAt?: BREAKPOINT;
    /** Disable header order icon */
    disableOrderIcon?: boolean;
    /** Custom header renderer for the column. Overrides the default table renderer */
    headerRenderer?: (props: ColumnHeaderCellProps) => JSX.Element;
    /** Custom renderer for the cells of the column. Overrides the default table renderer */
    renderer?: (props: ColumnCellRendererProps<T>) => JSX.Element;
    /** Custom compare function used for sorting */
    compare?: (a: T, b: T) => -1 | 0 | 1;
};

export type GridConfig = {
    /** Width of all borders */
    width?: string;
    /** Color of all borders */
    color?: string;
    /** Hover color of resizable borders */
    hoverColor?: string;
    /** Show inner vertical lines */
    showVerticalLines?: boolean;
    /** Show inner horizontal lines */
    showHorizontalLines?: boolean;
    /** Set extern table lines to be displayed */
    showExternLines?: EXTERN_LINE_GROUP | EXTERN_LINE[];
};

export type PaginationConfig = {
    /** Number of rows per page */
    entryPerPage: number;
    /** Renderer for the page selector component */
    renderer: (props: PageSelectorRendererProps) => JSX.Element;
};

export type OrderIconsConfig = {
    /** Renderer for ASC icon */
    [SORT_DIRECTION.ASC]?: () => JSX.Element;
    /** Renderer for DESC icon */
    [SORT_DIRECTION.DESC]?: () => JSX.Element;
    /** Renderer for INITIAL icon */
    [SORT_DIRECTION.INITIAL]?: () => JSX.Element;
};

export type SelectionConfig = {
    /** Horizontal weight of the selection column */
    flex: number;
    /** Array containing the list of initial selected rows. Every row will be represented by the value of its `indexKey` */
    initialSelection?: any[];
    /** Selection renderer for every row */
    renderer: (props: SelectionRendererProps) => JSX.Element;
    /** Selection renderer for the header */
    headerRenderer?: (props: SelectionHeaderRendererProps) => JSX.Element;
};

export type SkeletonConfig = {
    /** Number of skeleton rows to display */
    rows?: number;
    /** Skeleton cell renderer */
    renderer: () => JSX.Element;
};

export type CellPadding = {
    /** Padding vertical for every table cell, including headers */
    vertical?: string | ((breakpoint: BREAKPOINT) => string);
    /** Padding horizontal for every table cell, including headers */
    horizontal?: string | ((breakpoint: BREAKPOINT) => string);
};

export type OptionsCell<T> = {
    /** Horizontal weight of the options column */
    flex: number;
    /** Options renderer for every row */
    renderer: (props: OptionsCellProps<T>) => JSX.Element;
};

export type ColumnOrder<T = any> = {
    /** Object key of T */
    key: NestedKeyOf<T>;
    /** Direction order */
    direction: SORT_DIRECTION;
};

export type DefaultHeaderCellProps = {
    /** Header title */
    title: string;
};

export type DefaultCellRendererProps = {
    /** Cell text */
    text: any;
    /** Cell row index */
    rowIndex?: number;
};

export type ColumnHeaderCellProps = {
    /** Header title */
    title: string;
};

export type ColumnCellRendererProps<T> = {
    /** Row item */
    item: T;
    /** Row index */
    rowIndex?: number;
};

export type OptionsCellProps<T> = {
    /** Row item */
    item: T;
    /** Row index */
    rowIndex: number;
};

export type PageSelectorRendererProps = {
    /** Number of pages */
    nPages: number;
    /** Currently selected page index */
    currentPage: number;
    /** Change the selected page */
    setPage: (page: number) => void;
};

export type SelectionRendererProps = {
    /** Checked value */
    checked?: boolean;
    /** Trigger an update of the `checked` value */
    onChange?: () => void;
};

export type SelectionHeaderRendererProps = {
    /** Checked value */
    checked?: boolean;
    /** Trigger an update of the `checked` value */
    onChange?: () => void;
};
