const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.post('/', async (req, res) => {
    try {
        const { title, description, status, createdBy } = req.body;
        const newTask = new Task({
            title,
            description,
            status,
            createdBy,
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Endpoint do pobierania wszystkich zadań użytkownika
router.get('/', async (req, res) => {
    try {
        let sortBy = req.query.sortBy || 'createdAt';
        let sortOrder = 1; // Default to ascending order

        if (sortBy === 'status') {
            sortBy = { status: 1, createdAt: -1 }; // Sort by status, then by date
        } else if (sortBy === 'createdBy') {
            sortBy = { createdBy: 1, createdAt: -1 }; // Sort by user, then by date
        } else {
            sortBy = { [sortBy]: sortOrder };
        }

        const filter = req.query.status === 'pending' ? { status: 'pending' } : {};
        const tasks = await Task.find(filter).sort(sortBy);
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Endpoint do aktualizacji statusu zadania
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Endpoint do usuwania zadania
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
