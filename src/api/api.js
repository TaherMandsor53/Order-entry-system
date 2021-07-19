import axios from 'axios';

const baseURL = `http://localhost:5000/api`;

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

export default {
  createOrderDetails,
  getItemDetails,
  getOrderDetails,
};
