import { Table } from 'antd';
import { Columns } from './columns';
import { useAppDispatch, useAppSelector } from '../../store';
import { changePoint, changeSelectedOrder, selectOrders, selectSelectedOrder } from '../../store/orders/orders';
import { IOrder } from '../../interfaces/IOrder';
import { IChangePointPayload } from '../../interfaces/IChangePointPayload';
import { useCallback, useMemo } from 'react';

export const OrdersTable = () => {
  const dispatch = useAppDispatch();
  const tableData = useAppSelector(selectOrders);
  const selectedOrder = useAppSelector(selectSelectedOrder);

  const handleChangePoint = useCallback(
    (changePointData: IChangePointPayload) => {
      dispatch(changePoint(changePointData));
    },
    [dispatch]
  );

  const handleChangeSelectedOrder = useCallback(
    (record: IOrder) => {
      dispatch(changeSelectedOrder(record));
    },
    [dispatch]
  );

  const tableColumns = useMemo(() => Columns(handleChangePoint), [handleChangePoint]);
  const onRowHandlers = useCallback(
    (record: IOrder) => ({
      onClick: () => {
        handleChangeSelectedOrder(record);
      },
    }),
    [handleChangeSelectedOrder]
  );

  return (
    <Table
      style={{ width: '100%', height: '100%' }}
      columns={tableColumns}
      dataSource={tableData}
      pagination={false}
      rowKey={(row) => row.id}
      rowClassName={(record) => (record?.id === selectedOrder?.id ? 'ant-table-row-selected' : '')}
      onRow={onRowHandlers}
    />
  );
};
