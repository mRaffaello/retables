import { useState } from 'react';
import { SORT_DIRECTION } from '../types/enums';
import { ColumnOrder } from '../types/table';

function useOrder<T>() {
    // State
    const [columnOrder, _setColumnOrders] = useState<ColumnOrder>();

    // Methods
    const setColumnOrder = (index: number) => {
        if (!columnOrder || columnOrder.index !== index)
            _setColumnOrders({
                index,
                direction: SORT_DIRECTION.ASC
            });
        else if (columnOrder.index === index && columnOrder.direction === SORT_DIRECTION.ASC)
            _setColumnOrders({
                index,
                direction: SORT_DIRECTION.DESC
            });
        else _setColumnOrders(undefined);
    };

    const getColumnOrder = (index: number) => {
        if (columnOrder?.index === index) return columnOrder.direction;
    };

    return {
        columnOrder,
        setColumnOrder,
        getColumnOrder
    };
}

export default useOrder;
