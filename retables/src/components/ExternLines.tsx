import styled from '@emotion/styled';
import { GRID_DEFALTS } from '../config/constants';
import { CSS_VARIABLE } from '../types/enums';

function ExternLines() {
    // Render
    return (
        <>
            <LeftExtremeLine id='extern-left' />
            <RightExtremeLine id='extern-right' />
            <TopExtremeLine id='extern-top' />
            <BottomExtremeLine id='extern-bottom' />
        </>
    );
}

const LeftExtremeLine = styled.div`
    width: var(${CSS_VARIABLE.GRID_WIDTH_LEFT});
    background-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
    position: absolute;
    height: 100%;
    left: 0%;
`;

const RightExtremeLine = styled.div`
    width: var(${CSS_VARIABLE.GRID_WIDTH_RIGHT});
    background-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
    position: absolute;
    height: 100%;
    left: 100%;
    transform: translateX(
        calc(var(${CSS_VARIABLE.GRID_WIDTH_RIGHT}, ${GRID_DEFALTS.WIDTH}px) / (-1))
    );
`;

const TopExtremeLine = styled.div`
    height: var(${CSS_VARIABLE.GRID_WIDTH_TOP});
    background-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
    position: absolute;
    width: 100%;
    top: 0%;
`;

const BottomExtremeLine = styled.div`
    height: var(${CSS_VARIABLE.GRID_WIDTH_BOTTOM});
    background-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
    position: absolute;
    width: 100%;
    top: 100%;
    transform: translateY(
        calc(var(${CSS_VARIABLE.GRID_WIDTH_BOTTOM}, ${GRID_DEFALTS.WIDTH}px) / (-1))
    );
`;

export default ExternLines;
