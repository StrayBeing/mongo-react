// controllers/taskController.js
const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = new Task({ title, description, status, createdBy: req.user.id });
        await task.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.id });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
