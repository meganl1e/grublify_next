"use client";
import { useState, useEffect } from 'react';
import { getCurrentUser, logout as logoutAction } from '@/lib/auth-actions';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // track auth status
  const checkAuthStatus = async () => {
    try {
      const userData = await getCurrentUser();
      if (userData && !userData.error) {
        setUser(userData);
        setIsAuthenticated(true);
        setError(null);
        console.log('%c[Grublify Auth] User is authenticated:', 'color: green; font-weight: bold;', userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        if (userData?.error && userData.error !== 'Not authenticated' && userData.error !== 'No customer token found') {
          setError(userData.error);
        } else {
          setError(null);
        }
        console.log('%c[Grublify Auth] User is NOT authenticated', 'color: red; font-weight: bold;', userData?.error);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setError(error.message || 'Auth check failed');
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const result = await logoutAction();
      if (result.success) {
        setIsAuthenticated(false);
        setUser(null);
        setError(null);
        console.log('%c[Grublify Auth] User has logged out', 'color: orange; font-weight: bold;');
      }
    } catch (error) {
      setError(error.message || 'Logout failed');
      console.error('Logout failed:', error);
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    logout,
    checkAuthStatus
  };
} 