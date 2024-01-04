const express = require('express');
const colorController = require('../controllers/colorController');

const router = express.Router();

router.get('/colors', colorController.getAllcolors);
router.post('/colors', colorController.createcolor);
router.put('/colors/:id', colorController.updatecolor);
router.delete('/colors/:id', colorController.deletecolor);

module.exports = router;
