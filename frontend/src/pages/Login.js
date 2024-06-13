import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/style.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
        navigate('/tasks');
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="main-content">
                <h1>Login</h1>
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
                    <button type="submit">Login</button>
                </form>
            </div>
            <footer className="footer">
                <p>20480 Sobierajski Maciej</p>
            </footer>
        </div>
    );
};

export default Login;

