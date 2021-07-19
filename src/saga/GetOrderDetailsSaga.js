import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* orderDetailsSaga(action) {
  try {
    const orderDetails = yield call(api.getOrderDetails);
    yield put({
      type: types.GET_ORDER_DETAILS_SUCCESS,
      getOrderDetails: orderDetails.data,
    });
  } catch (e) {
    yield put({ type: types.GET_ORDER_DETAILS_ERROR, message: e.message });
  }
}

function* getOrderDetailsSaga() {
  yield takeLatest(types.GET_ORDER_DETAILS_REQUEST, orderDetailsSaga);
}

export default getOrderDetailsSaga;
