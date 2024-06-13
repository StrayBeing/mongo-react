import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Importuj Navbar
import axios from 'axios'; // Importuj axios do wykonywania zapytań HTTP
import '../styles/style.css'; // Importuj style CSS

const Home = () => {
    const [stats, setStats] = useState({ userCount: 0, taskCount: 0, completedTaskCount: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="home-container">
            <Navbar /> {/* Dodaj nawigację */}
            <main className="main-content">
                <h1>TODO LIST APP</h1>
                <p>Number of users: {stats.userCount}</p>
                <p>Number of tasks: {stats.taskCount}</p>
                <p>Number of completed tasks: {stats.completedTaskCount}</p>
            </main>
            <footer className="footer">
                <p>20480 Sobierajski Maciej</p>
            </footer>
        </div>
    );
};

export default Home;
