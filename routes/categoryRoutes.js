const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', categoryController.getAllcategories);
router.post('/categories', categoryController.createcategory);
router.put('/categories/:id', categoryController.updatecategory);
router.delete('/categories/:id', categoryController.deletecategory);

module.exports = router;
