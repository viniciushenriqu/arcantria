import React from 'react';
import Topbar from '../components/Topbar';
import './Transactions.css';

const mock = [
  { id: 1, tipo: 'Compra de item', valor: '-50 ARC' },
  { id: 2, tipo: 'Compra de token', valor: '+100 ARC' },
  { id: 3, tipo: 'Venda realizada', valor: '+30 ARC' }
];

function Transactions() {
  return (
    <>
      <Topbar />
      <div className="transactions-container">
        <h2>Histórico de Transações</h2>
        <ul>
          {mock.map(tx => (
            <li key={tx.id}>
              <strong>{tx.tipo}</strong>: {tx.valor}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Transactions;