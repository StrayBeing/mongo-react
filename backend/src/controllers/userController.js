const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: 'Użytkownik już istnieje' });
        }

        user = new User({ username, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' 
        });

        res.json({ user, token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Błąd serwera');
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {

        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' 
        });

        res.json({ user, token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Błąd serwera');
    }
};
