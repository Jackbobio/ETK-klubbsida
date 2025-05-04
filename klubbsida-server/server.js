const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const newsRoutes = require('./routes/news');
const adminRoutes = require('./routes/admin');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/news', newsRoutes);
app.use('/api/admin', adminRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});