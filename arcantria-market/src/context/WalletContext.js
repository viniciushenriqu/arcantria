import React, { createContext, useState } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress, userEmail, setUserEmail }}>
      {children}
    </WalletContext.Provider>
  );
};