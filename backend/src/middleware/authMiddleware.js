const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Jeśli nie ma tokenu, przekaż dalej (lub możesz zwrócić błąd 401)
    if (!token) {
        // return res.status(401).json({ message: 'Brak tokenu, autoryzacja odmówiona' });
        req.user = null; // Ustaw użytkownika na null lub coś innego, co wskazuje na brak autoryzacji
        next(); // Przejdź do następnego middleware lub obsługi zapytania
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        // return res.status(401).json({ message: 'Token nieprawidłowy' });
        req.user = null; // Ustaw użytkownika na null lub coś innego, co wskazuje na brak autoryzacji
        next(); // Przejdź do następnego middleware lub obsługi zapytania
    }
};

module.exports = authMiddleware;
