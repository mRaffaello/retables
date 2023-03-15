// React
import { useEffect, useState } from 'react';

// Utils
import { getBreakpointFromWidth } from '../utils/spacing';

// Todo: optimize
// https://css-tricks.com/working-with-javascript-media-queries/
function useBreakpoint() {
    // State
    const [breakpoint, setBreakpoint] = useState(getBreakpointFromWidth(window.innerWidth));

    // Methods
    const calcInnerWidth = () => setBreakpoint(getBreakpointFromWidth(window.innerWidth));

    // Effects
    useEffect(() => {
        window.addEventListener('resize', calcInnerWidth);
        return () => window.removeEventListener('resize', calcInnerWidth);
    }, []);

    return breakpoint;
}

export default useBreakpoint;
