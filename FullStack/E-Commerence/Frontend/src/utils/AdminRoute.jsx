import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="text-center py-20">Checking authorization...</div>;
    }

    if (!user || user.role !== "admin") {
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;