const { orderDetails, itemDetails } = require('../models/data.js');
const mongoose = require('mongoose');

const orderDetailsController = async (req, res) => {
  const orderData = req.body;

  const createOrder = await orderDetails(orderData);
  try {
    await createOrder.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const itemDetailsController = async (req, res) => {
  const itemData = req.body;
  const createItem = await itemDetails(itemData);
  try {
    await createItem.save();
    res.status(201).json(createItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getItemDetailsController = async (req, res) => {
  try {
    const getItemDetails = await itemDetails.find();
    res.status(200).json(getItemDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOrderDetailsController = async (req, res) => {
  try {
    const getOrderDetails = await orderDetails.find();
    res.status(200).json(getOrderDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteOrderDetailsController = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No order found with this Id');
  await orderDetails.findByIdAndRemove(id);
  res.status(200).json({ message: 'Order deleted successfully!!' });
};

const updateOrderDetailsController = async (req, res) => {
  const { id: _id } = req.params;
  const { payload } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post found with this Id');
  const updatedOrder = await orderDetails.findByIdAndUpdate(_id, { ...payload, _id }, { new: true });
  res.json({ message: 'Order Updated Successfully' });
};

module.exports = {
  orderDetailsController,
  itemDetailsController,
  getItemDetailsController,
  getOrderDetailsController,
  deleteOrderDetailsController,
  updateOrderDetailsController,
};
