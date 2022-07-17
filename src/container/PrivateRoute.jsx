import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

//private route for dashboard so entering url will check user auth, without logged in user will redirect to login
const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />
}

export default PrivateRoute;