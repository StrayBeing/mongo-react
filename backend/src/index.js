const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/UserRoutes');
const taskRoutes = require('./routes/TaskRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Dodaj middleware do autoryzacji użytkowników

// Przykład z użyciem Passport.js i JWT
// const passport = require('passport');
// app.use(passport.initialize());
// require('./config/passport')(passport);
const statsRouter = require('./routes/StatsRoutes');
app.use('/api', statsRouter);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Obsługa ścieżki głównej
app.get('/', (req, res) => {
    res.send('API działa');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
