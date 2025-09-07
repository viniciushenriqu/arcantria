import React, { useState } from 'react';
import Topbar from '../components/Topbar';
import './BuyCrypto.css';

function BuyCrypto() {
  const [valor, setValor] = useState('');

  const handleBuy = (e) => {
    e.preventDefault();
    alert(`Simulação: comprando ${valor} ARC`);
    setValor('');
  };

  return (
    <>
      <Topbar />
      <div className="buy-crypto-container">
        <form onSubmit={handleBuy}>
          <h2>Comprar Token ARC</h2>
          <input
            type="number"
            placeholder="Digite o valor em reais"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
          <button type="submit">Comprar</button>
        </form>
      </div>
    </>
  );
}

export default BuyCrypto;