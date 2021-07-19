const express = require('express');
const {
  orderDetailsController,
  itemDetailsController,
  getItemDetailsController,
  getOrderDetailsController,
} = require('../controllers/dataGet.js');

const router = express.Router();

router.post('/api/createOrder', orderDetailsController);
router.post('/api/createItem', itemDetailsController);
router.get('/api/itemDetails', getItemDetailsController);
router.get('/api/orderDetails', getOrderDetailsController);

module.exports = router;
