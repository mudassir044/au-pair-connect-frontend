import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const AuthRedirect: React.FC = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      // Redirect based on role
      const dashboardPath = user.role === 'au_pair' 
        ? '/dashboard/au-pair'
        : user.role === 'host_family'
        ? '/dashboard/host-family'
        : '/dashboard/admin';
      
      window.location.replace(dashboardPath);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    const dashboardPath = user.role === 'au_pair' 
      ? '/dashboard/au-pair'
      : user.role === 'host_family'
      ? '/dashboard/host-family'
      : '/dashboard/admin';
    
    return <Navigate to={dashboardPath} replace />;
  }

  return <Navigate to="/" replace />;
};