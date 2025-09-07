import React from 'react';
import Topbar from '../components/Topbar';
import './Profile.css';

const inventario = [
  { id: 1, nome: 'Espada Lendária', icone: '🗡️' },
  { id: 2, nome: 'Armadura de Fogo', icone: '🛡️' },
  { id: 3, nome: 'Poção de Mana x3', icone: '🧪' },
  { id: 4, nome: 'Anel Mágico', icone: '💍' },
  { id: 5, nome: 'Botas Velozes', icone: '👢' },
  { id: 6, nome: 'Livro Arcano', icone: '📘' },
];

function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile-content">
        <h1>Meu Inventário</h1>
        <div className="inventory-grid">
          {inventario.map((item) => (
            <div key={item.id} className="inventory-card">
              <div className="item-icon">{item.icone}</div>
              <div className="item-name">{item.nome}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;