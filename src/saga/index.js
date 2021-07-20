import { fork, all } from 'redux-saga/effects';
import createOrderDetailsSaga from './CreateOrderSaga';
import getItemDetailsSaga from './ItemDetailsSaga';
import getOrderDetailsSaga from './GetOrderDetailsSaga';
import deleteOrderDetailsSaga from './DeleteOrderSaga';
import updateOrderDetailsSaga from './UpdateOrderDetailsSaga';

function* sagas() {
  yield fork(createOrderDetailsSaga);
  yield fork(getItemDetailsSaga);
  yield fork(getOrderDetailsSaga);
  yield fork(deleteOrderDetailsSaga);
  yield fork(updateOrderDetailsSaga);
}

export default sagas;
