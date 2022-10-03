import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { ORDERS } from './mock.data';
import { IOrdersState } from '../../interfaces/IOrdersState';
import { IChangePointPayload } from '../../interfaces/IChangePointPayload';

const initialState: IOrdersState = {
  items: ORDERS,
  selectedOrder: null,
  points: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    changePoints: (state, { payload }) => {
      state.points = payload;
    },
    changePoint: (state, { payload: { recordId, pointId, type } }: PayloadAction<IChangePointPayload>) => {
      const item = state.items.find((x) => x.id === recordId);
      if (item) {
        item[type] = pointId;
        if (state.selectedOrder && state.selectedOrder.id === recordId) state.selectedOrder[type] = pointId;
      }
    },
    changeSelectedOrder: (state, { payload }) => {
      if (!state.selectedOrder || state.selectedOrder.id !== payload.id) {
        state.selectedOrder = payload;
      }
    },
  },
});

export const { changePoint, changeSelectedOrder, changePoints } = ordersSlice.actions;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectSelectedOrder = (state: RootState) => state.orders.selectedOrder;
export default ordersSlice.reducer;
