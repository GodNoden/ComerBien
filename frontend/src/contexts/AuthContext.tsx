import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { User, AuthResponse } from '../types/index'; // Agrega esta importación


interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: { username: string; email: string; password: string; }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing login on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedToken = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');

      if (savedToken && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setToken(savedToken);
          setUser(userData);
          setIsLoggedIn(true);
        } catch (error) {
          // Si hay error parseando, limpiamos el localStorage
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const authResponse: AuthResponse = await authService.login({ username, password });

      // Guardar token y usuario
      setToken(authResponse.token);
      setUser({
        id: authResponse.id,
        username: authResponse.username,
        email: authResponse.email
      });
      setIsLoggedIn(true);

      // Persistir en localStorage
      localStorage.setItem('auth_token', authResponse.token);
      localStorage.setItem('auth_user', JSON.stringify({
        id: authResponse.id,
        username: authResponse.username,
        email: authResponse.email
      }));

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: { username: string; email: string; password: string; }): Promise<boolean> => {
    try {
      setLoading(true);
      const authResponse: AuthResponse = await authService.register(userData);

      // Guardar token y usuario (auto-login después del registro)
      setToken(authResponse.token);
      setUser({
        id: authResponse.id,
        username: authResponse.username,
        email: authResponse.email
      });
      setIsLoggedIn(true);

      // Persistir en localStorage
      localStorage.setItem('auth_token', authResponse.token);
      localStorage.setItem('auth_user', JSON.stringify({
        id: authResponse.id,
        username: authResponse.username,
        email: authResponse.email
      }));

      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const value: AuthContextType = {
    isLoggedIn,
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};