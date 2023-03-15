import React from 'react';

type IconProps = {
    style?: React.CSSProperties;
};

function ChevronDoubleDownIcon(props: IconProps) {
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
                d='M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5'
            />
        </svg>
    );
}

export default ChevronDoubleDownIcon;
