import { useState } from 'react';
import { SORT_DIRECTION } from '../types/enums';
import { NestedKeyOf } from '../types/structs';
import { ColumnOrder } from '../types/table';

function useOrder<T>() {
    // State
    const [columnOrder, _setColumnOrders] = useState<ColumnOrder<T>>();

    // Methods
    const setColumnOrder = (key: NestedKeyOf<T>) => {
        if (!columnOrder || columnOrder.key !== key)
            _setColumnOrders({
                key,
                direction: SORT_DIRECTION.ASC
            });
        else if (columnOrder.key === key && columnOrder.direction === SORT_DIRECTION.ASC)
            _setColumnOrders({
                key,
                direction: SORT_DIRECTION.DESC
            });
        else _setColumnOrders(undefined);
    };
    const getColumnOrder = (columnKey: NestedKeyOf<T>) => {
        if (columnOrder?.key === columnKey) return columnOrder.direction;
    };

    return {
        columnOrder,
        setColumnOrder,
        getColumnOrder
    };
}

export default useOrder;
