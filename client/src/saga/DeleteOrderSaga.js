import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* deleteOrderSaga(action) {
  try {
    const deleteOrder = yield call(api.deleteOrderDetails, action.deleteId);
    yield put({
      type: types.DELETE_ORDER_DETAILS_SUCCESS,
      deleteOrderList: deleteOrder.data,
    });
  } catch (e) {
    yield put({ type: types.DELETE_ORDER_DETAILS_ERROR, message: e.message });
  }
}

function* deleteOrderDetailsSaga() {
  yield takeLatest(types.DELETE_ORDER_DETAILS_REQUEST, deleteOrderSaga);
}

export default deleteOrderDetailsSaga;
