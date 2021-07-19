import * as types from './actionTypes';

export function createOrderDetails(
  orderId,
  customerName,
  customerAddress,
  orderDate,
  shipDate,
  itemCode,
  grossOrderAmt,
  totalTax,
  shippingTax,
  totalAmt,
  quantity,
) {
  return {
    type: types.CREATE_ORDER_DETAILS_REQUEST,
    orderId,
    customerName,
    customerAddress,
    orderDate,
    shipDate,
    itemCode,
    grossOrderAmt,
    totalTax,
    shippingTax,
    totalAmt,
    quantity,
  };
}

export function getItemDetails() {
  return {
    type: types.GET_ITEM_DETAILS_REQUEST,
  };
}

export function getOrderDetails() {
  return {
    type: types.GET_ORDER_DETAILS_REQUEST,
  };
}
