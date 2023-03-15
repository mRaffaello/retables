import React from 'react';
import { PageSelectorRendererProps } from 'retables';

function PageSelector(props: PageSelectorRendererProps) {
    return (
        <div className='flex justify-end mt-5'>
            {Array(props.nPages)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        onClick={() => props.setPage(i)}
                        className={`items-center font-bold cursor-pointer px-4 py-2 border
                        text-sm hover:bg-gray-50 
                            ${
                                props.currentPage === i
                                    ? 'border-violet-800 text-violet-800 z-10'
                                    : 'border-gray-200 text-gray-500'
                            } `}>
                        {i}
                    </div>
                ))}
        </div>
    );
}

export default PageSelector;
