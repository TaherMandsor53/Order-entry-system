const express = require('express');
const {
  orderDetailsController,
  itemDetailsController,
  getItemDetailsController,
  getOrderDetailsController,
  deleteOrderDetailsController,
  updateOrderDetailsController,
} = require('../controllers/dataGet.js');

const router = express.Router();

router.post('/api/createOrder', orderDetailsController);
router.post('/api/createItem', itemDetailsController);
router.get('/api/itemDetails', getItemDetailsController);
router.get('/api/orderDetails', getOrderDetailsController);
router.delete('/api/orderDelete/:id', deleteOrderDetailsController);
router.put('/api/orderUpdate/:id', updateOrderDetailsController);

module.exports = router;
