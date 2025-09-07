import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import './ItemDetails.css';

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBuy = () => {
    alert('Compra simulada realizada!');
    navigate('/marketplace');
  };

  return (
    <>
      <Topbar />
      <div className="item-details-container">
        <h2>Detalhes do Item #{id}</h2>
        <p>Nome: Espada Lendária</p>
        <p>Descrição: Uma arma rara e poderosa.</p>
        <p>Preço: 50 ARC</p>
        <button onClick={handleBuy}>Comprar</button>
      </div>
    </>
  );
}

export default ItemDetails;