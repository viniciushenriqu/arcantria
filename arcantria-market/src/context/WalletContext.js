import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(false);

  // Carregar dados do usuário quando o token estiver disponível
  useEffect(() => {
    if (authToken) {
      loadUserData();
    }
  }, [authToken]);

  const loadUserData = async () => {
    try {
      const response = await authAPI.getUser();
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      // Se erro 401, limpar token
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const login = async (address) => {
    setLoading(true);
    try {
      const response = await authAPI.loginWallet(address);
      const { access } = response.data; // Assumindo que retorna { access: token }

      localStorage.setItem('authToken', access);
      setAuthToken(access);
      setWalletAddress(address);

      // Carregar dados do usuário
      await loadUserData();

      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: error.response?.data?.error || 'Erro no login' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setWalletAddress(null);
    setUser(null);
  };

  return (
    <WalletContext.Provider value={{
      walletAddress,
      setWalletAddress,
      user,
      authToken,
      loading,
      login,
      logout,
      loadUserData
    }}>
      {children}
    </WalletContext.Provider>
  );
}
