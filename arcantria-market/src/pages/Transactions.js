import React from 'react';
import Topbar from '../components/Topbar';
import './Transactions.css';

const mock = [
  { id: 1, tipo: 'Compra de item', valor: '-50 ARC', data: '2023-10-01', status: 'Concluída' },
  { id: 2, tipo: 'Compra de token', valor: '+100 ARC', data: '2023-10-02', status: 'Concluída' },
  { id: 3, tipo: 'Venda realizada', valor: '+30 ARC', data: '2023-10-03', status: 'Concluída' },
  { id: 4, tipo: 'Compra de NFT', valor: '-200 ARC', data: '2023-10-04', status: 'Pendente' },
  { id: 5, tipo: 'Transferência', valor: '-15 ARC', data: '2023-10-05', status: 'Concluída' }
];

function Transactions() {
  return (
    <>
      <Topbar />
      <div className="transactions-page">
        <div className="transactions-section">
          <h1>Histórico de Transações</h1>
          <div className="transactions-grid">
            {mock.map(tx => (
              <div className="transaction-card-modern" key={tx.id}>
                <div className="transaction-header">
                  <h3>{tx.tipo}</h3>
                  <span className={`transaction-status ${tx.status.toLowerCase()}`}>{tx.status}</span>
                </div>
                <div className="transaction-details">
                  <p className="transaction-value">{tx.valor}</p>
                  <p className="transaction-date">{tx.data}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Transactions;
