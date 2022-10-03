import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { changePoints } from './orders';
import { IResponseRoute, IStep } from '../../interfaces/IResponseRoute';
import { Api } from '../../api/Api';
import { PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../interfaces/IOrder';

export const FETCH_ROUTING_ACTION = 'ROUTING_FETCH_REQUESTED';

function* fetchRouting({
  payload,
}: PayloadAction<IOrder>): Generator<CallEffect<IResponseRoute> | PutEffect, void, IResponseRoute> {
  try {
    const routeData: IResponseRoute = yield call(Api.fetchRoutingApi, payload);
    const steps = routeData.routes[0].legs[0].steps;
    const points = steps.map((step: IStep) => {
      return step.geometry.coordinates.map(([lat, log]: number[]) => [log, lat]);
    });
    yield put(changePoints(points));
  } catch (error) {
    if (error instanceof Error) window.console.error(error.message);
  }
}

function* orderSaga() {
  yield takeLatest(FETCH_ROUTING_ACTION, fetchRouting);
}

export default orderSaga;
