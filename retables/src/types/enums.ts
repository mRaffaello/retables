export enum BREAKPOINT {
    XS,
    SM,
    MD,
    LG,
    XL,
    DOUBLEXL
}

export enum SORT_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC',
    INITIAL = 'INITIAL'
}

export enum EXTERN_LINE {
    TOP = 'TOP',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    BOTTOM = 'BOTTOM'
}

export enum EXTERN_LINE_GROUP {
    ALL = 'ALL',
    NONE = 'NONE'
}

export enum CSS_VARIABLE {
    CELL_COL_N_WIDTH = '--rt-cell-col-$-width',
    CELL_COL_N_LEFT = '--rt-cell-col-$-left-position',
    CELL_PADDING_HORIZONTAL = '--rt-cell-padding-horizontal',
    CELL_PADDING_VERTICAL = '--rt-cell-padding-vertical',
    GRID_WIDTH_HORIZONTAL = '--rt-grid-width-horizontal',
    GRID_WIDTH_VERTICAL = '--rt-grid-width-vertical',
    GRID_WIDTH_TOP = '--rt-grid-width-top',
    GRID_WIDTH_LEFT = '--rt-grid-width-left',
    GRID_WIDTH_RIGHT = '--rt-grid-width-rigth',
    GRID_WIDTH_BOTTOM = '--rt-grid-width-bottom',
    GRID_COLOR = '--rt-grid-color',
    GRID_HOVER_COLOR = '--rt-grid-hover-color'
}
