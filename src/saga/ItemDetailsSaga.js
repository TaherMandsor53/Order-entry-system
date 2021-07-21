import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* itemDetailsSaga(action) {
  try {
    const itemDetails = yield call(api.getItemDetails);
    yield put({
      type: types.GET_ITEM_DETAILS_SUCCESS,
      itemDetails: itemDetails.data,
    });
  } catch (e) {
    yield put({ type: types.GET_ITEM_DETAILS_ERROR, message: e.message });
  }
}

function* getItemDetailsSaga() {
  yield takeLatest(types.GET_ITEM_DETAILS_REQUEST, itemDetailsSaga);
}

export default getItemDetailsSaga;
