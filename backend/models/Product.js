const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    sustainability_score: { type: Number, required: true },
    certifications: { type: [String] },
    materials: { type: [String] },
    carbon_footprint: { type: String },
    price: { type: Number },
    url: { type: String },
    // image_url: { type: String },
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
