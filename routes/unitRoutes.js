const express = require('express');
const unitController = require('../controllers/unitController');

const router = express.Router();

router.get('/units', unitController.getAllunits);
router.post('/units', unitController.createunit);
router.put('/units/:id', unitController.updateunit);
router.delete('/units/:id', unitController.deleteunit);

module.exports = router;
