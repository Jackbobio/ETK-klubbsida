const express = require('express');
const router = express.Router();
const Price = require('../models/Prices');
const jwtCheck = require('../middleware/jwtCheck');
const checkAdminRole = require('../middleware/roleCheck');

router.get('/', async (req, res) => {
    try {
        const prices = await Price.find();
        if (prices.length === 0) {
            return res.status(404).json({ message: 'No prices found' });
        }
        res.json(prices);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', jwtCheck, checkAdminRole, async (req, res) => {
    const price = new Price({
        item: req.body.title,
        price: req.body.price,
    });

    try {
        const newPrice = await price.save();
        res.status(201).json(newPrice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const price = await Price.findById(req.params.id);
        if (!price) {
            return res.status(404).json({ message: 'Price not found' });
        }

        price.price = req.body.price;
        const updatedPrice = await price.save();
        res.json(updatedPrice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;