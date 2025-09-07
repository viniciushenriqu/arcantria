import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { WalletContext } from '../context/WalletContext';
import './Register.css';

function Register() {
  const { setWalletAddress, setUserEmail } = useContext(WalletContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!window.ethereum) {
        setError('Por favor, instale a MetaMask!');
        return;
      }

      // Conecta com MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];

      // Valida o email
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setError('Por favor, insira um email válido');
        return;
      }

      // Salva no contexto
      setWalletAddress(address);
      setUserEmail(email);
      setError(null);

      // Opcional: Envia para o backend
      // await axios.post('http://localhost:3001/api/register', { walletAddress: address, email });
      console.log('Cadastro realizado:', { walletAddress: address, email });

      // Redireciona para a página Home
      navigate('/home');
    } catch (err) {
      setError('Erro ao conectar a carteira: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>ArcantriaMarket - Cadastro</h2>
        <p>Conecte sua carteira e insira seu email</p>

        <input
          type="email"
          placeholder="Digite seu email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
          style={{ width: '100%', padding: '12px 15px', marginBottom: '15px' }} // Estilo inline para garantir consistência
        />

        <button
          type="submit"
          disabled={loading}
          className="register-button"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar com MetaMask'}
        </button>

        {error && <p className="error-text">{error}</p>}

        <p className="login-text">
          Já tem conta? <Link to="/">Faça login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;