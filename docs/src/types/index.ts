export type ApiDesc = {
    name: string;
    type: string;
    description: string;
    required?: boolean;
};

export type BreakpointDesc = {
    breakpoint: string;
    from?: number;
    to?: number;
};

export type CompareFunctionDesc = {
    returnValue: number;
    description: string;
};
