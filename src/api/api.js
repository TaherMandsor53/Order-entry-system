import axios from 'axios';

const baseURL = `https://order-entry-system.vercel.app/api`;

const createOrderDetails = (
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
) => {
  const URL = `${baseURL}/createOrder`;
  return axios.post(URL, {
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
  });
};

const getItemDetails = () => {
  const URL = `${baseURL}/itemDetails`;
  return axios.get(URL);
};

const getOrderDetails = () => {
  const URL = `${baseURL}/orderDetails`;
  return axios.get(URL);
};

const deleteOrderDetails = deleteId => {
  const URL = `${baseURL}/orderDelete/${deleteId}`;
  return axios.delete(URL);
};

const updateOrderDetails = (editId, payload) => {
  const URL = `${baseURL}/orderUpdate/${editId}`;
  return axios.put(URL, { payload });
};

export default {
  createOrderDetails,
  getItemDetails,
  getOrderDetails,
  deleteOrderDetails,
  updateOrderDetails,
};
