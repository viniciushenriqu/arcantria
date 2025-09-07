import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import ItemDetails from './pages/ItemDetails';
import BuyCrypto from './pages/BuyCrypto';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions';
import Withdraw from './pages/Withdraw';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/buy-crypto" element={<BuyCrypto />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/withdraw" element={<Withdraw />} />
      </Routes>
    </Router>
  );
}

export default App;