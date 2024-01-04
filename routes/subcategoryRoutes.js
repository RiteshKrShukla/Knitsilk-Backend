const express = require('express');
const subcategoryController = require('../controllers/subcategoryController');

const router = express.Router();

router.get('/subcategories', subcategoryController.getAllsubcategories);
router.post('/subcategories', subcategoryController.createsubcategory);
router.put('/subcategories/:id', subcategoryController.updatesubcategory);
router.delete('/subcategories/:id', subcategoryController.deletesubcategory);

module.exports = router;
