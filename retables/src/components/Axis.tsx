// React
import { useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

// Config
import { GRID_DEFALTS } from '../config/constants';

// Others
import { CSS_VARIABLE } from '../types/enums';
import styled from '@emotion/styled';
import { setColsPercentagesVariables } from '../utils/spacing';
import { TableIdContext } from './TableWrapper';
import { gc } from '../utils/css';

type AxisProps = {
    colsPercentages: number[];
    resizable?: boolean;
    hasCheckboxCell?: boolean;
};

function Axis(props: AxisProps) {
    // Props
    const { colsPercentages } = props;

    // Hooks
    const { getTableId } = useContext(TableIdContext);

    // References
    const grid = useRef<HTMLDivElement>(null);
    const colsPercentagesRef = useRef([...colsPercentages]);
    const tempPercentagesRef = useRef([...colsPercentages]);
    const lockTimerRef = useRef<number>(new Date().getTime());
    const containerWidthRef = useRef<number>();

    // Memos
    const canBeHovered = useMemo(() => props.resizable, [props.resizable]);

    // Methods
    const onMouseDown = (mouseDownEvent: any, lineIndex: number) => {
        if (!props.resizable) return;

        const startXPosition = mouseDownEvent.pageX;

        lineIndex = lineIndex - 1;

        const onMouseMove = (mouseMoveEvent: any) => {
            // Check elapsed time from lock
            const time = new Date().getTime();
            if (time - lockTimerRef.current <= 600) return;

            // Check if container has width
            if (containerWidthRef.current === undefined) {
                const _containerWidth = grid.current?.offsetWidth;
                containerWidthRef.current = _containerWidth;
                return;
            }

            if (!containerWidthRef.current) return;

            // Get final position
            const finalXPosition = mouseMoveEvent.pageX;

            // First line when selection is defined is not resizable
            if (lineIndex === 0 && props.hasCheckboxCell) return;

            // Last line is not resizable
            if (lineIndex > colsPercentagesRef.current.length) return;

            // Get new column size percentage
            const newSize =
                (containerWidthRef.current * colsPercentagesRef.current[lineIndex]) / 100 -
                startXPosition +
                finalXPosition;
            let newPercentage = (newSize / containerWidthRef.current) * 100;

            // Check min col percentage
            if (newPercentage < GRID_DEFALTS.MIN_COL_PERCENTAGE) return;

            // Get next column size
            const nextPercentage =
                colsPercentagesRef.current[lineIndex] +
                colsPercentagesRef.current[lineIndex + 1] -
                newPercentage;

            // Check min col percentage
            if (nextPercentage < GRID_DEFALTS.MIN_COL_PERCENTAGE) return;

            let updatedPercetages = [...colsPercentagesRef.current];
            updatedPercetages[lineIndex] = newPercentage;
            updatedPercetages[lineIndex + 1] = nextPercentage;

            setColsPercentagesVariables(getTableId(), updatedPercetages);
            tempPercentagesRef.current = updatedPercetages;
        };

        const onMouseUp = () => {
            lockTimerRef.current = new Date().getTime();
            colsPercentagesRef.current = tempPercentagesRef.current;
            setColsPercentagesVariables(getTableId(), tempPercentagesRef.current);
            document.body.removeEventListener('mousemove', onMouseMove);
        };

        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp, { once: true });
    };

    // Effects
    useLayoutEffect(() => {
        const _containerWidth = grid.current?.offsetWidth;
        if (_containerWidth && _containerWidth !== containerWidthRef.current) {
            containerWidthRef.current = _containerWidth;
        }
    });

    useEffect(() => {
        colsPercentagesRef.current = [...colsPercentages];
        tempPercentagesRef.current = [...colsPercentages];
        setColsPercentagesVariables(getTableId(), colsPercentages);
    }, [colsPercentages]);

    // Render
    return (
        <div ref={grid}>
            {props.colsPercentages.map(
                (_, i) =>
                    i !== 0 && (
                        <MainVerticalLine key={i} index={i}>
                            {canBeHovered && (
                                <HoverVerticalLine
                                    className='hoverable-line'
                                    key={i}
                                    onMouseDown={e => onMouseDown(e, i)}
                                />
                            )}
                        </MainVerticalLine>
                    )
            )}
        </div>
    );
}

type MainVerticalLineProps = {
    index: number;
};

const MainVerticalLine = styled.div<MainVerticalLineProps>`
    width: var(${CSS_VARIABLE.GRID_WIDTH_VERTICAL}, ${GRID_DEFALTS.WIDTH}px);
    background-color: var(${CSS_VARIABLE.GRID_COLOR}, ${GRID_DEFALTS.COLOR});
    position: absolute;
    height: 100%;
    left: var(${props => gc(CSS_VARIABLE.CELL_COL_N_LEFT, [props.index])});
    transform: translateX(
        calc(var(${CSS_VARIABLE.GRID_WIDTH_VERTICAL}, ${GRID_DEFALTS.WIDTH}px) / (-1))
    );
`;

const HoverVerticalLine = styled.div`
    width: ${GRID_DEFALTS.HOVER_WIDTH}px;
    background-color: transparent;
    height: 100%;
    cursor: col-resize;
    transform: translateX(-50%);
    :hover {
        background-color: var(${CSS_VARIABLE.GRID_HOVER_COLOR}, ${GRID_DEFALTS.HOVER_COLOR});
    }
`;

export default Axis;
