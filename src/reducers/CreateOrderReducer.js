import * as types from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  createOrderDetails: [],
  getOrderDetails: [],
};

export default function createOrder(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_ORDER_DETAILS_REQUEST:
      return { ...state, isFetching: true };

    case types.CREATE_ORDER_DETAILS_SUCCESS:
      return { isFetching: false, createOrderDetails: action.createOrderDetails };

    case types.CREATE_ORDER_DETAILS_ERROR:
      return { ...state, isFetching: false, error: action.message };

    case types.GET_ORDER_DETAILS_REQUEST:
      return { ...state, isFetching: true };

    case types.GET_ORDER_DETAILS_SUCCESS:
      return { isFetching: false, getOrderDetails: action.getOrderDetails };

    case types.GET_ORDER_DETAILS_ERROR:
      return { ...state, isFetching: false, error: action.message };

    default:
      return state;
  }
}
