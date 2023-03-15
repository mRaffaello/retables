import { useMemo } from 'react';
import styled from '@emotion/styled';
import { GRID_DEFALTS } from '../config/constants';
import { ColumnConfig, SkeletonConfig } from '../types/table';
import { gc } from '../utils/css';
import { CSS_VARIABLE } from '../types/enums';

type SkeletonRowProps = {
    indexTable: number;
    colsPercentages: number[];
    skeletonConfig: SkeletonConfig;
    baseRowClasses?: string | ((index: number) => string);
};

function SkeletonRow(props: SkeletonRowProps) {
    // Memos
    const baseRowClasses = useMemo(() => {
        if (!props.baseRowClasses) return;
        if (typeof props.baseRowClasses === 'string') return props.baseRowClasses;
        else return props.baseRowClasses(props.indexTable);
    }, [props.baseRowClasses]);

    // Render
    return (
        <SkeletonRowContainer className={baseRowClasses}>
            {props.colsPercentages.map((_, i) => (
                <SkeletonCellContainer key={i} index={i}>
                    {<props.skeletonConfig.renderer />}
                </SkeletonCellContainer>
            ))}
        </SkeletonRowContainer>
    );
}

const SkeletonRowContainer = styled.tr`
    display: flex;
    width: 100%;
    :not(:last-child) {
        border-bottom: solid;
        border-bottom-width: var(${CSS_VARIABLE.GRID_WIDTH_HORIZONTAL}, ${GRID_DEFALTS.WIDTH}px);
        border-bottom-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
    }
`;

type SkeletonCellContainerProps = {
    index: number;
};

const SkeletonCellContainer = styled.td<SkeletonCellContainerProps>`
    width: var(${props => gc(CSS_VARIABLE.CELL_COL_N_WIDTH, [props.index])});
    padding-left: var(--cell-padding-horizontal);
    padding-right: var(--cell-padding-horizontal);
    padding-top: var(--cell-padding-vertical);
    padding-bottom: var(--cell-padding-vertical);
`;

export default SkeletonRow;
