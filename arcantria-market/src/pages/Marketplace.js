import React, { useState } from 'react';
import Topbar from '../components/Topbar';
import './Marketplace.css';

const categorias = [
  { id: 1, nome: 'Armas', emoji: '🗡️' },
  { id: 2, nome: 'Armaduras', emoji: '🛡️' },
  { id: 3, nome: 'Poções', emoji: '🧪' },
  { id: 4, nome: 'Magias', emoji: '✨' },
];

const itens = [
  { id: 1, nome: 'Espada de Aço', categoria: 'Armas', preco: 100 },
  { id: 2, nome: 'Machado Orc', categoria: 'Armas', preco: 150 },
  { id: 3, nome: 'Armadura de Couro', categoria: 'Armaduras', preco: 200 },
  { id: 4, nome: 'Poção de Cura', categoria: 'Poções', preco: 50 },
  { id: 5, nome: 'Poção de Mana', categoria: 'Poções', preco: 60 },
  { id: 6, nome: 'Bola de Fogo', categoria: 'Magias', preco: 300 },
];

function Marketplace() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const itensFiltrados = categoriaSelecionada
    ? itens.filter((item) => item.categoria === categoriaSelecionada)
    : [];

  return (
    <>
      <Topbar />
      <div className="marketplace-content">
        <h1>Marketplace</h1>

        {/* Categorias */}
        <div className="categoria-row">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              className={`categoria-btn ${categoriaSelecionada === cat.nome ? 'ativa' : ''}`}
              onClick={() => {
                setCategoriaSelecionada(cat.nome);
                setItemSelecionado(null);
              }}
            >
              <span className="categoria-emoji">{cat.emoji}</span> {cat.nome}
            </button>
          ))}
        </div>

        {/* Itens */}
        {categoriaSelecionada && (
          <div className="itens-grid">
            {itensFiltrados.map((item) => (
              <div
                key={item.id}
                className="item-card"
                onClick={() => setItemSelecionado(item)}
              >
                {item.nome}
              </div>
            ))}
          </div>
        )}

        {/* Modal de compra */}
        {itemSelecionado && (
          <div className="item-modal">
            <div className="item-modal-content">
              <h2>{itemSelecionado.nome}</h2>
              <p>Preço: {itemSelecionado.preco} Gold</p>
              <button className="buy-btn">Comprar</button>
              <button className="close-btn" onClick={() => setItemSelecionado(null)}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Marketplace;