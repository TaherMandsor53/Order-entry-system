const mongoose = require('mongoose');

const orderDetailsSchema = mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
    default: 0,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerAddress: {
    type: String,
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },
  shipDate: {
    type: String,
    required: true,
  },
  itemCode: {
    type: Number,
    required: true,
  },
  grossOrderAmt: {
    type: Number,
  },
  totalTax: {
    type: Number,
  },
  shippingTax: {
    type: Number,
  },
  totalAmt: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const itemDetailsSchema = new mongoose.Schema({
  itemCode: {
    type: Number,
    unique: true,
    default: 0,
  },
  itemName: String,
  rate: Number,
});

const orderDetails = mongoose.model('orderDetails', orderDetailsSchema);
const itemDetails = mongoose.model('itemDetails', itemDetailsSchema);

module.exports = {
  orderDetails,
  itemDetails,
};
