import { CSS_VARIABLE } from '../types/enums';

export const buildCssVariable = (variable: CSS_VARIABLE, args?: (string | number)[]) => {
    if (!args) return variable;
    let v = String(variable);

    args.forEach(a => {
        v = v.replace('$', `${a}`);
    });

    return v;
};

export const generateTableCssVariable = (
    variable: CSS_VARIABLE,
    args?: (string | number)[] | (string | number)
) => {
    return `${buildCssVariable(
        variable,
        args ? (Array.isArray(args) ? args : [args]) : undefined
    )}`;
};

export const gc = generateTableCssVariable;

export const setCssVariable = (tableId: string, key: string, value: string | number) => {
    const r = document.querySelector(`#${tableId}`) as HTMLElement;
    if (r) {
        r.style.setProperty(key, String(value));
    }
};
