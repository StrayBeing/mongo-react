// Register.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/style.css';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(username, password);
        navigate('/tasks');
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="main-content">
                <h1>Register</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
            <footer className="footer">
                <p>20480 Sobierajski Maciej</p>
            </footer>
        </div>
    );
};

export default Register;
