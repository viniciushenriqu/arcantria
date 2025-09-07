import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { WalletContext } from '../context/WalletContext';
import './Login.css';

function Login() {
  const { setWalletAddress } = useContext(WalletContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const connectWallet = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        setError('Por favor, instale a MetaMask!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      setWalletAddress(address); // Salva no contexto
      setError(null);

      // Opcional: Envia o endereço ao backend
      // await axios.post('http://localhost:3001/api/login', { walletAddress: address });
      console.log('Endereço conectado:', address);

      // Redireciona para a página Marketplace
      navigate('/marketplace');
    } catch (err) {
      setError('Erro ao conectar a carteira: ' + err.message);
    } finally {
      setLoading(false);
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

        {error && <p className="error-text">{error}</p>}

        <p className="register-text">
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;