import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // Show a loader while checking auth status
        return <div className="text-center py-20">Checking authorization...</div>;
    }

    // Check if user is logged in AND is an admin
    if (!user || user.role !== "admin") {
        // If not authenticated or not admin, redirect to login page
        // You could also redirect to a 403 Forbidden page
        return <Navigate to="/login" replace />; 
    }

    // If authorized, render the child routes/components
    return <Outlet />;
};

export default AdminRoute;