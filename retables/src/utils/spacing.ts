// Types
import { BREAKPOINT, CSS_VARIABLE } from '../types/enums';
import { ColumnConfig } from '../types/table';
import { generateTableCssVariable } from './css';

export const getBreakpointFromWidth = (width: number) => {
    if (width >= 640 && width < 768) {
        return BREAKPOINT.SM;
    } else if (width >= 768 && width < 1024) {
        return BREAKPOINT.MD;
    } else if (width >= 1024 && width < 1280) {
        return BREAKPOINT.LG;
    } else if (width >= 1280 && width < 1536) {
        return BREAKPOINT.XL;
    } else if (width >= 1536) {
        return BREAKPOINT.DOUBLEXL;
    }

    return BREAKPOINT.XS;
};

export const getColsPercentages = (
    columns: ColumnConfig[],
    selectionFlex?: number,
    rowOptionFlex?: number
) => {
    let flexes = columns.map(c => c.flex || 1);

    if (selectionFlex !== undefined) flexes = [selectionFlex, ...flexes];
    if (rowOptionFlex !== undefined) flexes = [...flexes, rowOptionFlex];

    let flexSum = flexes.reduce((p, n) => p + n, 0);

    return flexes.map(flex => (flex * 100) / flexSum);
};

export const getBreakpointValue = (breakpoint: BREAKPOINT) => {
    switch (breakpoint) {
        case BREAKPOINT.SM:
            return 1;
        case BREAKPOINT.MD:
            return 2;
        case BREAKPOINT.LG:
            return 3;
        case BREAKPOINT.XL:
            return 4;
        case BREAKPOINT.DOUBLEXL:
            return 5;
        default:
            return 0;
    }
};

export const compareBreakpoints = (
    first: BREAKPOINT,
    second: BREAKPOINT,
    excludeEqual?: boolean
) => {
    const firstValue = getBreakpointValue(first);
    const secondValue = getBreakpointValue(second);
    return excludeEqual ? firstValue > secondValue : firstValue >= secondValue;
};

export const setColsPercentagesVariables = (
    tableId: string,
    colsPercentages: number[],
    setOnRoot = false
) => {
    const r = setOnRoot
        ? (document.querySelector(`:root`) as HTMLElement)
        : (document.querySelector(`#${tableId}`) as HTMLElement);
    if (r) {
        let sum = 0;

        colsPercentages.forEach((p, i) => {
            r.style.setProperty(
                generateTableCssVariable(CSS_VARIABLE.CELL_COL_N_WIDTH, [i]),
                `${p}%`
            );
            r.style.setProperty(
                generateTableCssVariable(CSS_VARIABLE.CELL_COL_N_LEFT, [i]),
                `${sum}%`
            );
            sum += p;
        });
    }
};
