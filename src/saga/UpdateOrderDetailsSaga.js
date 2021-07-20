import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* updateOrderSaga(action) {
  try {
    const updateOrder = yield call(api.updateOrderDetails, action.editId, action.payload);
    yield put({
      type: types.UPDATE_ORDER_DETAILS_SUCCESS,
      updateOrderList: updateOrder.data,
    });
  } catch (e) {
    yield put({ type: types.UPDATE_ORDER_DETAILS_ERROR, message: e.message });
  }
}

function* updateOrderDetailsSaga() {
  yield takeLatest(types.UPDATE_ORDER_DETAILS_REQUEST, updateOrderSaga);
}

export default updateOrderDetailsSaga;
