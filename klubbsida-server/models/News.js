const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String, required: true},
    content: { 
        type : String, required: true},
    coverpage: {
        type: String, required: true,
        validate: {
            validator: function(value) {
                // Check if it's a base64 string for a webp image
                return value.startsWith('data:image/webp;base64,');
            },
            message: 'Coverpage must be a webp image'
        }
    },
    contentImage: {
        type: String,
        validate: {
            validator: function(value) {
                // If contentImage is provided, it should be a base64 string
                if (!value) return true; // Optional field
                return typeof value === 'string';
            },
            message: 'Content image must be a valid image'
        }
    },
    date: {
        type: Date, default: Date.now},
})

module.exports = mongoose.model('News', newsSchema);