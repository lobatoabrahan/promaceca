import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface MiddlewareProps {
  component: React.ComponentType<any>;
}

const Middleware: React.FC<MiddlewareProps> = ({ component: Component }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('Middleware - Redirecting to /login');
    return <Navigate to="/login" />;
  }

  console.log('Middleware - Rendering Dashboard');
  return <Component />;
};

export default Middleware
