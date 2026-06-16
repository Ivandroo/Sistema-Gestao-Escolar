import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  children: React.ReactElement;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const role = user?.role ?? null;
    const rolesLower = allowedRoles.map((r) => r.toLowerCase());
    if (!role || !rolesLower.includes(role.toLowerCase())) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
