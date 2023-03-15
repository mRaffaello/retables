import React from 'react';

type IconProps = {
    style?: React.CSSProperties;
};

function ChevronDoubleUpIcon(props: IconProps) {
    // Render
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            style={props.style}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5'
            />
        </svg>
    );
}

export default ChevronDoubleUpIcon;
