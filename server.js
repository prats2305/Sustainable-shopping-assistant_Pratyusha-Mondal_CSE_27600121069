const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require('./routes/productRoutes');
// const searchRoutes = require('./routes/search');
const impactRoutes = require('./routes/impactRoutes');

// const brandRoutes = require('./routes/brandRoutes');
// const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Sustainable_Shopping', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Use Routes
app.use("/api/auth", authRoutes);
app.use('/api/Product', productRoutes);
// app.use('/api', searchRoutes);
app.use('/api/impact', impactRoutes);

// app.use('/users', userRoutes);
// app.use('/brands', brandRoutes);
// app.use('/feedback', feedbackRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('Sustainable Shopping Backend is running!');
});

// // POST Request to Add Data
// app.post('/api/resource', async (req, res) => {
//     const newData = new MyModel(req.body);
//     try {
//       const savedData = await newData.save();
//       res.status(201).json(savedData);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
// });

// // GET Request to Fetch Data
// app.get('/api/resource', async (req, res) => {
// try {
//     const data = await MyModel.find();
//     res.status(200).json(data);
// } catch (err) {
//     res.status(500).json({ error: err.message });
// }
// });
  
// // PUT Request to Update Data
// app.put('/api/resource/:id', async (req, res) => {
// const { id } = req.params; // Extract ID from request params
// const updatedData = req.body; // Extract updated data from request body

// try {
//     const result = await MyModel.findByIdAndUpdate(id, updatedData, {
//     new: true, // Return the updated document
//     runValidators: true, // Run schema validations on update
//     });

//     if (!result) {
//     return res.status(404).json({ message: 'Document not found' });
//     }

//     res.status(200).json(result);
// } catch (err) {
//     res.status(500).json({ error: err.message });
// }
// });

// // DELETE Request to Delete Data
// app.delete('/api/resource/:id', async (req, res) => {
// const { id } = req.params; // Extract ID from request params

// try {
//     const result = await MyModel.findByIdAndDelete(id);

//     if (!result) {
//     return res.status(404).json({ message: 'Document not found' });
//     }

//     res.status(200).json({ message: 'Document deleted successfully' });
// } catch (err) {
//     res.status(500).json({ error: err.message });
// }
// });

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
