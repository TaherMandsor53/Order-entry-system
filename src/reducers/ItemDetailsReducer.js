import * as types from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  itemDetails: [],
};

export default function getItemDetails(state = initialState, action) {
  switch (action.type) {
    case types.GET_ITEM_DETAILS_REQUEST:
      return { ...state, isFetching: true };

    case types.GET_ITEM_DETAILS_SUCCESS:
      return { isFetching: false, itemDetails: action.itemDetails };

    case types.GET_ITEM_DETAILS_ERROR:
      return { ...state, isFetching: false, error: action.message };

    default:
      return state;
  }
}
