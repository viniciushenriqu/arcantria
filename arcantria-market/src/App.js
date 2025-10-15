import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions';
import Topbar from './components/Topbar';
import { WalletContext } from './context/WalletContext';

function PrivateRoute({ children }) {
  const { walletAddress } = useContext(WalletContext);
  return walletAddress ? children : <Navigate to="/login" replace />;
}

function App() {
  const { walletAddress } = useContext(WalletContext);

  return (
    <Router>
      {/* Topbar só aparece se a carteira estiver conectada */}
      {walletAddress && <Topbar />}

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas privadas */}
        <Route
          path="/marketplace"
          element={
            <PrivateRoute>
              <Marketplace />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />

        {/* Redireciona raiz para /login */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
