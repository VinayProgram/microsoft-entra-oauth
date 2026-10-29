import { Outlet } from '@tanstack/react-router';
import React, { useEffect, useState } from 'react';
import App from '../App';

const Guard = () => {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuthAndRedirect();
  }, []);

  const checkAuthAndRedirect = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/is-authenticated', {
        credentials: 'include',
      });
      
      const data = await response.json();

      if (data.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        // Prevent infinite loop if already on the login page
        if (window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#020617',
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px'
      }}>
        Verifying session...
      </div>
    );
  }

  // If authenticated, render protected child routes. Otherwise render nothing or let root handle it.
  return isAuthenticated ? <Outlet /> : <App/>;
};

export default Guard;