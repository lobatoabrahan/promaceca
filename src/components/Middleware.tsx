import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

interface MiddlewareProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}

const Middleware: React.FC<MiddlewareProps> = ({ component: Component }) => {
  const { currentUser } = useAuthContext();

  // Loading state can be handled here if needed

  if (!currentUser) {
    console.log('Middleware - Redirecting to /login');
    return <Navigate to="/login" />;
  }

  console.log('Middleware - Rendering Protected Component');
  return <Component />;
};

export default Middleware;
