const express = require('express');
const router = express.Router();
const News = require('../models/News');
const jwtCheck = require('../middleware/jwtCheck');
const checkAdminRole = require('../middleware/roleCheck');

/**
 * News routes
 * GET: Public access - anyone can view news
 * POST, PUT, DELETE: Admin access only - requires authentication and admin role
 */

// Public route - Get all news posts
router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Protected route - Create a new news post (admin only)
router.post('/', jwtCheck, checkAdminRole, async (req, res) => {
    const { title, content, coverpage, contentImage } = req.body;
    
    // Validate required fields
    if (!title || !content || !coverpage) {
        return res.status(400).json({ 
            error: "Bad Request",
            message: "Title, content, and coverpage are required" 
        });
    }
    
    // Validate coverpage is a webp image
    if (!coverpage.startsWith('data:image/webp;base64,')) {
        return res.status(400).json({
            error: "Bad Request",
            message: "Coverpage must be a webp image"
        });
    }
    
    // Create news post with validated data
    const newsPost = new News({
        title,
        content,
        coverpage,
        contentImage: contentImage || null
    });

    try {
        const newPost = await newsPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Protected route - Update a news post (admin only)
router.put('/:id', jwtCheck, checkAdminRole, async (req, res) => {
    try {
        // If updating coverpage, validate it's a webp image
        if (req.body.coverpage && !req.body.coverpage.startsWith('data:image/webp;base64,')) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Coverpage must be a webp image"
            });
        }
        
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedNews) {
            return res.status(404).json({ 
                error: "Not Found",
                message: "News post not found" 
            });
        }
        
        res.json(updatedNews);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Protected route - Delete a news post (admin only)
router.delete('/:id', jwtCheck, checkAdminRole, async (req, res) => {
    try {
        const deletedNews = await News.findByIdAndDelete(req.params.id);
        
        if (!deletedNews) {
            return res.status(404).json({ 
                error: "Not Found",
                message: "News post not found" 
            });
        }
        
        res.json({ message: "News post deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;