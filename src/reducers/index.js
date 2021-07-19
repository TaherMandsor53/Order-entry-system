import { combineReducers } from 'redux';

import createOrder from './CreateOrderReducer';
import getItemDetails from './ItemDetailsReducer';

export default combineReducers({
  createOrder,
  getItemDetails,
});
