const express = require('express');
const Product = require('../models/Product'); // Import Product Schema
const router = express.Router();

// // Add a Product
// router.post('/add', async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).send('Product added successfully!');
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Get All Products
// router.get('/all', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get a Product by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) return res.status(404).send('Product not found');
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update a Product by ID
// router.put('/:id', async (req, res) => {
//     try {
//         const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!product) return res.status(404).send('Product not found');
//         res.json(product);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Delete a Product by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) return res.status(404).send('Product not found');
//         res.send('Product deleted successfully');
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Search Route
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    console.log('Received query:', query);

    const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } }
        ]
    });
    console.log('Products found:', products);

    res.json(products);
  } catch (error) {
    console.error('Error in /search route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
