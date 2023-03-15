import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';
import { GRID_DEFALTS } from '../config/constants';
import { CSS_VARIABLE } from '../types/enums';
import { ColumnConfig, SkeletonConfig } from '../types/table';

type SkeletonMinRowProps<T> = {
    indexTable: number;
    columnConfigs: ColumnConfig<T>[];
    skeletonConfig: SkeletonConfig;
    baseRowClasses?: string | ((index: number) => string);
    baseHeaderClasses?: string;
    baseHeaderRenderer?: (props: { title: string }) => JSX.Element;
};

function SkeletonMinRow<T>(props: SkeletonMinRowProps<T>) {
    // Memos
    const baseRowClasses = useMemo(() => {
        if (!props.baseRowClasses) return;
        if (typeof props.baseRowClasses === 'string') return props.baseRowClasses;
        else return props.baseRowClasses(props.indexTable);
    }, [props.baseRowClasses]);

    // Callbacks
    const renderHeaderCell = useCallback(
        (columnConfig: ColumnConfig<T>) => {
            if (columnConfig.headerRenderer)
                return <columnConfig.headerRenderer title={columnConfig.title} />;
            else if (props.baseHeaderRenderer)
                return <props.baseHeaderRenderer title={columnConfig.title} />;
            else return <DefaultHeaderContainer>{columnConfig.title}</DefaultHeaderContainer>;
        },
        [props.baseHeaderRenderer]
    );

    // Render
    return (
        <BodyContainer>
            {props.columnConfigs.map(c => (
                <RowContainer key={String(c.key)} className={baseRowClasses}>
                    <CellHeaderContainer className={props.baseHeaderClasses}>
                        {renderHeaderCell(c)}
                    </CellHeaderContainer>
                    <CellValueContainer>
                        <props.skeletonConfig.renderer />
                    </CellValueContainer>
                </RowContainer>
            ))}
        </BodyContainer>
    );
}

const BodyContainer = styled.tbody`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom-width: var(${CSS_VARIABLE.GRID_WIDTH_HORIZONTAL}, ${GRID_DEFALTS.WIDTH}px);
    border-bottom-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
`;

const CellValueContainer = styled.td`
    flex: 0.7;
    overflow: hidden;
    padding-left: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-right: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-top: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
    padding-bottom: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
`;

const DefaultHeaderContainer = styled.div`
    text-align: left;
`;

const RowContainer = styled.tr`
    display: flex;
    width: 100%;
`;

const CellHeaderContainer = styled.th`
    flex: 0.3;
    overflow: hidden;
    padding-left: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-right: var(${CSS_VARIABLE.CELL_PADDING_HORIZONTAL});
    padding-top: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
    padding-bottom: var(${CSS_VARIABLE.CELL_PADDING_VERTICAL});
`;

export default SkeletonMinRow;
