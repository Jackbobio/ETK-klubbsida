const express = require('express');
const router = express.Router();
const Price = require('./models/price');

router.get('/', async (req, res) => {
    try {
        const prices = await Price.find();
        if (prices.length === 0) {
            return res.status(404).json({ message: 'No prices found for' });
        }
        res.json(prices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const price = new Price({
        item: req.body.title,
        price: req.body.price,
    });

    try {
        const newPrice = await price.save();
        res.status(201).json(newPrice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});