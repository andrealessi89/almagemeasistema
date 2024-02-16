import React, { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const verifyTimeToken = (token) => {
    const decoded = jwtDecode(token);
    const exp = decoded.exp;
    const currentTime = Date.now() / 1000;
    if (exp < currentTime) {
        // Token expirado
        return false
    } else {
        return true
    }
}
const PrivateRoute = ({ children }) => {
    try {
        const tokenStorage = localStorage.getItem('token');
        const userStorage = localStorage.getItem('token');
        const navigate = useNavigate();
        useEffect(() => {
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (!token || !user) {
                navigate('/login');
            }
        }, [navigate]);
        if (tokenStorage) {
            if (!verifyTimeToken(tokenStorage)) {
                return <Navigate to="/login" />;
            }
        }
        return children;
    } catch (err) {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;