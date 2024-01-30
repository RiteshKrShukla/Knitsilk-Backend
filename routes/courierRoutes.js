const express = require('express');
const courierController = require('../controllers/courierController');

const router = express.Router();

router.get('/couriers', courierController.getAllcouriers);
router.post('/couriers', courierController.createcourier);
router.put('/couriers/:id', courierController.updatecourier);
router.delete('/couriers/:id', courierController.deletecourier);

module.exports = router;
