import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* createOrderSaga(action) {
  try {
    const orderDetails = yield call(
      api.createOrderDetails,
      action.orderId,
      action.customerName,
      action.customerAddress,
      action.orderDate,
      action.shipDate,
      action.itemCode,
      action.grossOrderAmt,
      action.totalTax,
      action.shippingTax,
      action.totalAmt,
      action.quantity,
    );
    yield put({
      type: types.CREATE_ORDER_DETAILS_SUCCESS,
      createOrderDetails: orderDetails.data,
    });
  } catch (e) {
    yield put({ type: types.CREATE_ORDER_DETAILS_ERROR, message: e.message });
  }
}

function* createOrderDetailsSaga() {
  yield takeLatest(types.CREATE_ORDER_DETAILS_REQUEST, createOrderSaga);
}

export default createOrderDetailsSaga;
