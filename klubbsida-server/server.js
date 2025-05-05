const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const newsRoutes = require('./routes/news');


require('dotenv').config();

const app = express();

const jwtCheck = require('./middleware/jwtCheck');
const checkAdminRole = require('./middleware/roleCheck');
const logRequest = require('./mock/logRequest');

app.use(cors());
app.use(express.json());
app.use('/api/news', newsRoutes);
// app.use('/api/admin', adminRoutes);

app.get('/api/admin', logRequest, jwtCheck, (req, res, next) => {
    // This runs only AFTER jwtCheck succeeds!
    console.log('jwtCheck passed, req.auth:', req.auth);
    next();
  }, checkAdminRole, (req, res) => {
    // Your handler
    res.json({ ok: true });
  });

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

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      // JWT failed
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    next(err);
  });