const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const User = require('../models/User'); // Zakładając, że masz model User

// Endpoint do pobierania statystyk
router.get('/stats', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const taskCount = await Task.countDocuments();
        const completedTaskCount = await Task.countDocuments({ status: 'completed' });

        res.json({ userCount, taskCount, completedTaskCount });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
