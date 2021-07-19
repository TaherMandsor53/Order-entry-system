const { orderDetails, itemDetails } = require('../models/data.js');

const orderDetailsController = async (req, res) => {
  const orderData = req.body;

  const createOrder = await orderDetails(orderData);
  try {
    await createOrder.save();
    res.status(201).send('Order created successfully');
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

module.exports = {
  orderDetailsController,
  itemDetailsController,
  getItemDetailsController,
  getOrderDetailsController,
};
