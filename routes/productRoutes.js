const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');



// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });



router.post('/products', upload.single('photo'), async (req, res) => {
  try {
    const {
      title,
      userCurrency,
      description,
      discount,
      price,
      globalPrice,
      color,
      primaryColor,
      secondaryColor,
      craftType,
      yarnWeight,
      listingStatus,
      qtyInStock,
      category,
      shopSection,
      tags,
      materials,
      deliveryOption,
      itemWeight,
      itemSize,
      manufacturer,
      productDimensions,
      primaryMaterial,
      secondaryMaterial,
      quantityInStock,
      makeContent,
      care,
      yardage,
      needleSize,
      hookSize,
      photos,
      subCategory,
      video,
      priceINR,
      priceUSD,
      priceGBP,
      priceEUR,
      priceCAD,
      priceAUD,
      priceJPY,
      HSNCode,
      personalization,
      handPaintedOrDyed,
      pleatedOrRuffled,
      wired,
      cutToSize,
      length,
      width,
      units,
      variations,
      wrapsPerInch,
      yarnCounts,
      meterPer100g,
      otherNames,
      lengthUnit,
      widthUnit,
      packageWeight,
      packageDimensions,
      bulletPoints,
      productLength,
      productWidth,
      productHeight,
      packageLength,
      packageWidth,
      packageHeight,
      lengthVariations,
      qtyVariations,
      colorVariations,
      sku,
    } = req.body;

    const product = new Product({
      title,
      description,
      discount,
      userCurrency,
      price,
      globalPrice,
      color,
      primaryColor,
      secondaryColor,
      craftType,
      yarnWeight,
      listingStatus,
      qtyInStock,
      category,
      shopSection,
      tags,
      HSNCode,
      materials,
      deliveryOption,
      itemWeight,
      itemSize,
      manufacturer,
      productDimensions,
      primaryMaterial,
      secondaryMaterial,
      quantityInStock,
      makeContent,
      care,
      yardage,
      needleSize,
      hookSize,
      dateAdded: new Date(),
      photos,
      subCategory,
      video,
      priceINR,
      priceUSD,
      priceGBP,
      priceEUR,
      priceCAD,
      priceAUD,
      priceJPY,
      handPaintedOrDyed,
      pleatedOrRuffled,
      wired,
      cutToSize,
      personalization,
      length,
      width,
      units,
      variations,
      wrapsPerInch,
      yarnCounts,
      meterPer100g,
      otherNames,
      lengthUnit,
      widthUnit,
      packageWeight,
      packageDimensions,
      bulletPoints,
      productLength,
      productWidth,
      productHeight,
      packageLength,
      packageWidth,
      packageHeight,
      lengthVariations,
      qtyVariations,
      colorVariations,
      sku,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding product.' });
  }
});

// router.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) {
      filter = { category };
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// get products by listingstatus
router.get('/products/listingstatus', async (req, res) => {
  const { status } = req.query;
  try {
    const products = await Product.find({ listingStatus: status });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


// get products by mostviewed
router.get('/products/mostviewed', async (req, res) => {
  const { shopSection } = req.body;
  try {
    const products = await Product.find({ shopSection: "MostViewed" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// get products by newarrivals
router.get('/products/newarrivals', async (req, res) => {
  const { shopSection } = req.body;
  try {
    const products = await Product.find({ shopSection: "NewArrivals" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// get products by featured
router.get('/products/featured', async (req, res) => {
  const { shopSection } = req.body;
  try {
    const products = await Product.find({ shopSection: "Featured" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// get products by bestseller
router.get('/products/bestseller', async (req, res) => {

  try {
    const products = await Product.find({ shopSection: "BestSellers" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get products by SpotlightDeals
router.get('/products/spotlightdeals', async (req, res) => {

  try {
    const products = await Product.find({ shopSection: "SpotlightDeals" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// get products by categories
router.get('/products/categories', async (req, res) => {
  const { category } = req.query;
  try {
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// get products by subcategories
router.get('/products/subcategories', async (req, res) => {
  const { subcategory } = req.query;
  const { category } = req.query;
  console.log(subcategory)
  try {
    const products = await Product.find({ subCategory: subcategory, category: category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET endpoint for fetching a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT endpoint for updating a product by ID
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE endpoint for deleting a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST endpoint for deleting multiple products by IDs
router.post('/products/delete-multiple', async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty productIds array' });
    }

    const deletedProducts = await Product.deleteMany({ _id: { $in: productIds } });

    if (deletedProducts.deletedCount === 0) {
      return res.status(404).json({ error: 'No products found for the provided productIds' });
    }
    res.json({ message: 'Products deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// PUT endpoint for updating listing status of products by IDs
router.put('/products/listing-status', async (req, res) => {
  try {
    const { productIds, listingStatus } = req.body;

    // Check if product IDs and listing status are provided
    if (!productIds || !listingStatus) {
      return res.status(400).json({ error: 'Product IDs and listing status are required for updating.' });
    }

    // Update listing status for the specified products
    const updatedProducts = await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { listingStatus } },
      { new: true }
    );

    res.json(updatedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
