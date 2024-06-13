// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { username, password });
            localStorage.setItem('user', JSON.stringify(res.data.user)); // Zapisujemy tylko dane użytkownika
            setUser(res.data.user);
            console.log('Successful login:', res.data); // Logowanie sukcesu
        } catch (error) {
            console.error('Błąd logowania:', error);
        }
    };

    const register = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', { username, password });
            localStorage.setItem('user', JSON.stringify(res.data.user)); // Zapisujemy tylko dane użytkownika
            setUser(res.data.user);
            console.log('Successful registration:', res.data); // Logowanie sukcesu
        } catch (error) {
            console.error('Błąd rejestracji:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
