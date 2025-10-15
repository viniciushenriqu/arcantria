import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { WalletContext } from '../context/WalletContext';
import { balanceAPI } from '../services/api';
import './Topbar.css';

function Topbar() {
  const { walletAddress, user, logout } = useContext(WalletContext);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (walletAddress) {
      loadBalance();
    }
  }, [walletAddress]);

  const loadBalance = async () => {
    try {
      const response = await balanceAPI.getBalance();
      setBalance(response.data.balance);
    } catch (err) {
      console.error('Erro ao carregar saldo:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="topbar">
        <div className="topbar-left">
          <h1>ArcantriaMarket</h1>
          <div className="saldo-moeda">
            💰 {balance} ARK{' '}
            {walletAddress
              ? `(${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)})`
              : ''}
          </div>
        </div>

        <div className="topbar-right">
          <span className="user-info">
            {user ? `Olá, ${user.username}` : 'Carregando...'}
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </div>
      </nav>

      <div className="sub-nav">
        <NavLink to="/marketplace" className="sub-btn">
          Marketplace
        </NavLink>
        <NavLink to="/profile" className="sub-btn">
          Inventário
        </NavLink>
        <NavLink to="/transactions" className="sub-btn">
          Transações
        </NavLink>
      </div>
    </>
  );
}

export default Topbar;
