// userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Rejestracja użytkownika
exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Sprawdź, czy użytkownik już istnieje
        let user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ message: 'Użytkownik już istnieje' });
        }

        // Stwórz nowego użytkownika
        user = new User({ username, password });

        // Zaszyfruj hasło przed zapisaniem do bazy danych
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generowanie tokena JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token wygasa po 1 godzinie
        });

        res.json({ user, token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Błąd serwera');
    }
};

// Logowanie użytkownika
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Sprawdź, czy użytkownik istnieje
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });
        }

        // Sprawdź poprawność hasła
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Nieprawidłowe dane logowania' });
        }

        // Generowanie tokena JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token wygasa po 1 godzinie
        });

        res.json({ user, token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Błąd serwera');
    }
};
