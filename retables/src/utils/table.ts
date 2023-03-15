import { EXTERN_LINE_GROUP, EXTERN_LINE } from '../types/enums';

export const getExternLines = (showExternLines?: EXTERN_LINE_GROUP | EXTERN_LINE[]) => {
    if (!showExternLines) return [];
    else if (Array.isArray(showExternLines)) return showExternLines;
    else if ((showExternLines as EXTERN_LINE_GROUP) === EXTERN_LINE_GROUP.ALL)
        return [EXTERN_LINE.TOP, EXTERN_LINE.BOTTOM, EXTERN_LINE.LEFT, EXTERN_LINE.RIGHT];
    else return [];
};
