import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { WalletContext } from '../context/WalletContext';
import './Login.css';

function Login() {
  const { login, loading } = useContext(WalletContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('Por favor, instale a MetaMask! Você pode baixá-la em https://metamask.io/');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      // Verificar se MetaMask está desbloqueada
      try {
        await provider.send('eth_accounts', []);
      } catch (unlockError) {
        setError('Por favor, desbloqueie sua carteira MetaMask primeiro.');
        return;
      }

      const accounts = await provider.send('eth_requestAccounts', []);

      if (accounts.length === 0) {
        setError('Nenhuma conta conectada. Por favor, conecte uma conta na MetaMask.');
        return;
      }

      const address = accounts[0];

      // Fazer login via API
      const result = await login(address);

      if (result.success) {
        setError(null);
        navigate('/marketplace');
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Erro detalhado:', err);
      if (err.code === 4001) {
        setError('Conexão rejeitada pelo usuário. Por favor, aceite a conexão na MetaMask.');
      } else if (err.code === -32002) {
        setError('Uma solicitação de conexão já está pendente. Verifique sua MetaMask.');
      } else {
        setError('Erro ao conectar a carteira: ' + (err.message || 'Erro desconhecido'));
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>ArcantriaMarket</h2>
        <p>Conecte sua carteira para acessar a plataforma</p>

        <button
          type="button"
          onClick={connectWallet}
          disabled={loading}
          className="login-button"
        >
          {loading ? 'Conectando...' : 'Conectar com MetaMask'}
        </button>

        <div className="login-help">
          <p><strong>Como conectar:</strong></p>
          <ol>
            <li>Certifique-se de que a MetaMask está instalada</li>
            <li>Desbloqueie sua carteira na MetaMask</li>
            <li>Clique em "Conectar com MetaMask"</li>
            <li>Aprove a conexão quando solicitado</li>
          </ol>
        </div>

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
