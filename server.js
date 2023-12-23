const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(`mongodb://localhost:27017/rest-api`, { useNewUrlParser: true, useUnifiedTopology: true });

// User Model
const User = require('./models/User');

// Routes
// GET all users
app.get('/users', async (req, res) => {
try {
    const users = await User.find();
    res.json(users);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

// POST new user
app.post('/users', async (req, res) => {
const user = new User(req.body);
try {
    const savedUser = await user.save();
    res.json(savedUser);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// PUT update user by ID
app.put('/users/:id', async (req, res) => {
try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// DELETE user by ID
app.delete('/users/:id', async (req, res) => {
try {
    const removedUser = await User.findByIdAndDelete(req.params.id);
    res.json(removedUser);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// Start the server
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});