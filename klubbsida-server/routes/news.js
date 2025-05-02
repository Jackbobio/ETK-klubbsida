const express = require('express');
const router = express.Router();
const News = require('../models/News');

router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { title, content  } = req.body;
    const newsPost = new News({
        title,
        content,
    });

    try {
        const newPost = await newsPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;