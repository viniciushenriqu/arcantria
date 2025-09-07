import React from 'react';
import Topbar from '../components/Topbar';
import './Withdraw.css';

function Withdraw() {
  return (
    <>
      <Topbar />
      <div className="withdraw-container">
        <h2>Sacar Moedas</h2>
        <p>Essa função permitirá transferir ARC para sua carteira externa.</p>
        <div className="withdraw-form">
          <label htmlFor="amount">Quantidade de ARC</label>
          <input type="number" id="amount" placeholder="Digite o valor em ARC" />
          <button type="button">Sacar</button>
        </div>
      </div>
    </>
  );
}

export default Withdraw;