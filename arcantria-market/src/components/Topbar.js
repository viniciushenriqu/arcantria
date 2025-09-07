import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { WalletContext } from '../context/WalletContext';
import './Topbar.css';

function Topbar() {
  const { walletAddress } = useContext(WalletContext);
  const saldoMock = '150 ARC';

  return (
    <>
      <nav className="topbar">
        <div className="topbar-left">
          <h1>ArcantriaMarket</h1>
          <div className="saldo-moeda">
            💰 {saldoMock} {walletAddress ? `(${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)})` : ''}
          </div>
        </div>
        <ul className="topbar-nav">
          {/* Links opcionais na topbar principal, se quiser manter alguns */}
        </ul>
      </nav>
      <div className="sub-nav">
        <NavLink to="/marketplace" className="sub-btn" activeClassName="ativa">Marketplace</NavLink>
        <NavLink to="/profile" className="sub-btn" activeClassName="ativa">Inventário</NavLink>
        <NavLink to="/buy-crypto" className="sub-btn" activeClassName="ativa">Comprar Moedas</NavLink>
        <NavLink to="/transactions" className="sub-btn" activeClassName="ativa">Transações</NavLink>
        <NavLink to="/withdraw" className="sub-btn" activeClassName="ativa">Sacar</NavLink>
      </div>
    </>
  );
}

export default Topbar;