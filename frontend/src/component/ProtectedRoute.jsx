import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component
const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return token ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
