const mongoose = require('mongoose');



// Schema definition for price data
const priceSchema = new mongoose.Schema({
    item: String,  // Name/description of the item
    price: Number, // Price value in numeric format
});

// Create the Price model using the schema
const Price = mongoose.model('Price', priceSchema);

// Export the Price model for use in other files
module.exports = Price;
