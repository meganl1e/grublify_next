"use client";
import { useState, useEffect } from 'react';
import { getCurrentUser, logout as logoutAction } from '@/lib/auth-actions';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // track auth status
  const checkAuthStatus = async () => {
    try {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        console.log('%c[Grublify Auth] User is authenticated:', 'color: green; font-weight: bold;', userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        console.log('%c[Grublify Auth] User is NOT authenticated', 'color: red; font-weight: bold;');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
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
        console.log('%c[Grublify Auth] User has logged out', 'color: orange; font-weight: bold;');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    logout,
    checkAuthStatus
  };
} 