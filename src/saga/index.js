import { fork, all } from 'redux-saga/effects';
import createOrderDetailsSaga from './CreateOrderSaga';
import getItemDetailsSaga from './ItemDetailsSaga';
import getOrderDetailsSaga from './GetOrderDetailsSaga';

function* sagas() {
  yield fork(createOrderDetailsSaga);
  yield fork(getItemDetailsSaga);
  yield fork(getOrderDetailsSaga);
}

export default sagas;
