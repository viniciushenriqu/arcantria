import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import { WalletContext } from "../context/WalletContext";
import { productsAPI, ordersAPI, balanceAPI } from "../services/api";
import "./Marketplace.css";

function Marketplace() {
  const navigate = useNavigate();
  const { user } = useContext(WalletContext);
  const [products, setProducts] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsResponse, balanceResponse] = await Promise.all([
        productsAPI.getProducts(),
        balanceAPI.getBalance()
      ]);

      setProducts(productsResponse.data);
      setBalance(balanceResponse.data.balance);
    } catch (err) {
      setError('Erro ao carregar dados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (product) => {
    if (balance < product.price) {
      alert('Saldo insuficiente!');
      return;
    }

    try {
      // Criar order
      const orderData = {
        product: product.id,
        quantity: 1,
        total_price: product.price
      };

      const orderResponse = await ordersAPI.createOrder(orderData);
      const order = orderResponse.data;

      // Pagar order
      await ordersAPI.payOrder(order.id);

      // Recarregar dados
      await loadData();

      alert('Compra realizada com sucesso!');
    } catch (err) {
      alert('Erro na compra: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <>
      <Topbar />
      <div className="marketplace-content">
        <h1>Marketplace</h1>
        <div className="balance-info">
          <p>Saldo: {balance} ARK</p>
        </div>
        <div className="itens-grid">
          {products.map((product) => (
            <div className="item-card-modern" key={product.id}>
              <div className="item-image">
                <img src={`/assets/${product.name.toLowerCase().replace(/\s+/g, '')}.png`} alt={product.name} />
              </div>
              <h2>{product.name}</h2>
              <p className="item-preco">{product.price} Ark</p>
              <p className="item-descricao">{product.description}</p>
              <button onClick={() => navigate(`/item/${product.id}`)} className="buy-btn-modern">Detalhes</button>
              <button
                onClick={() => handleBuy(product)}
                className="buy-btn-modern"
                style={{ marginTop: '10px' }}
                disabled={balance < product.price}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Marketplace;
