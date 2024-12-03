const express = require('express');
const Impact = require('../models/Impact'); // Import User Schema
const router = express.Router();

// // Add a User
// router.post('/register', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         await user.save();
//         res.status(201).send('User registered successfully!');
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Get All Users
// router.get('/all', async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Get a User by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) return res.status(404).send('User not found');
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update a User by ID
// router.put('/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!user) return res.status(404).send('User not found');
//         res.json(user);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Delete a User by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         if (!user) return res.status(404).send('User not found');
//         res.send('User deleted successfully');
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;

// const express = require('express');
// // Import Impact model if using it for persistence
// const Impact = require('../models/Impact'); 

// const router = express.Router();


// Mock Impact Data Route
router.post('/track', async (req, res) => {
    const { userId, productName } = req.body;
    const impact = await Impact.findOne({ userId });
  
    if (impact) {
      impact.eco_purchases.push({ productName, date: new Date() });
      await impact.save();
    } else {
      await Impact.create({ userId, eco_purchases: [{ productName, date: new Date() }] });
    }
  
    res.status(200).send('Impact tracked');
  });
  
  module.exports = router;
