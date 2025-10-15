import React, { useState } from "react";
import Topbar from "../components/Topbar";
import "./Profile.css";

const baseCharacter = "/assets/manekin.png";

const inventario = [
  {
    id: 1,
    nome: "Espada dos Cavaleiros Reais",
    preco: 50,
    descricao: "Uma lâmina lendária empunhada pelos guardiões do reino.",
    imagem: "/assets/espada.png",
    tipo: "arma",
  },
  {
    id: 2,
    nome: "Machado dos Cavaleiros Reais",
    preco: 45,
    descricao: "Um machado forjado com poder e honra dos cavaleiros reais.",
    imagem: "/assets/machado.png",
    tipo: "arma",
  },
  {
    id: 3,
    nome: "Escudo dos Cavaleiros Reais",
    preco: 35,
    descricao: "Protege seu portador com a força do reino eterno.",
    imagem: "/assets/escudo.png",
    tipo: "escudo",
  },
  {
    id: 4,
    nome: "Cajado dos Magos Reais",
    preco: 60,
    descricao: "Canaliza o poder arcano dos magos do reino.",
    imagem: "/assets/cajado.png",
    tipo: "arma",
  },
];

const slotTypes = {
  "right-hand": ["arma", "escudo"],
  "left-hand": ["arma", "escudo"],
  "chest": ["armadura"],
  "head": ["elmo"],
  "legs": ["pernas"],
  "feet": ["botas"],
};

function Profile() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [equippedItems, setEquippedItems] = useState({});

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleEquipItem = (item) => {
    if (selectedSlot && slotTypes[selectedSlot].includes(item.tipo)) {
      setEquippedItems({ ...equippedItems, [selectedSlot]: item });
      setSelectedSlot(null);
    }
  };

  const handleUnequip = (slot) => {
    if (equippedItems[slot]) {
      const newEquipped = { ...equippedItems };
      delete newEquipped[slot];
      setEquippedItems(newEquipped);
    }
  };

  const filteredItems = selectedSlot ? inventario.filter(item => slotTypes[selectedSlot].includes(item.tipo)) : [];

  const isItemEquipped = (item) => {
    return Object.values(equippedItems).some(equipped => equipped && equipped.id === item.id);
  };

  return (
    <>
      <Topbar />
      <div className="profile-page">
        {/* Lado esquerdo: personagem e slots */}
        <div className="character-section">
          <h2>Personagem</h2>
          <div className="character-wrapper">
            <img
              src={baseCharacter}
              alt="Personagem Base"
              className="character-base"
            />

            {/* Slots de Equipamento */}
            <div className="equipment-slot slot-head" title="Elmo" onClick={() => equippedItems["head"] ? handleUnequip("head") : handleSlotClick("head")}>
              {equippedItems["head"] && <img src={equippedItems["head"].imagem} alt={equippedItems["head"].nome} />}
            </div>
            <div className="equipment-slot slot-chest" title="Armadura" onClick={() => equippedItems["chest"] ? handleUnequip("chest") : handleSlotClick("chest")}>
              {equippedItems["chest"] && <img src={equippedItems["chest"].imagem} alt={equippedItems["chest"].nome} />}
            </div>
            <div
              className="equipment-slot slot-right-hand"
              title="Mão Direita"
              onClick={() => equippedItems["right-hand"] ? handleUnequip("right-hand") : handleSlotClick("right-hand")}
            >
              {equippedItems["right-hand"] && <img src={equippedItems["right-hand"].imagem} alt={equippedItems["right-hand"].nome} />}
            </div>
            <div
              className="equipment-slot slot-left-hand"
              title="Mão Esquerda"
              onClick={() => equippedItems["left-hand"] ? handleUnequip("left-hand") : handleSlotClick("left-hand")}
            >
              {equippedItems["left-hand"] && <img src={equippedItems["left-hand"].imagem} alt={equippedItems["left-hand"].nome} />}
            </div>
            <div className="equipment-slot slot-legs" title="Pernas" onClick={() => equippedItems["legs"] ? handleUnequip("legs") : handleSlotClick("legs")}>
              {equippedItems["legs"] && <img src={equippedItems["legs"].imagem} alt={equippedItems["legs"].nome} />}
            </div>
            <div className="equipment-slot slot-feet" title="Botas" onClick={() => equippedItems["feet"] ? handleUnequip("feet") : handleSlotClick("feet")}>
              {equippedItems["feet"] && <img src={equippedItems["feet"].imagem} alt={equippedItems["feet"].nome} />}
            </div>
          </div>
          <p className="character-text">Equipe ou visualize seus equipamentos.</p>
        </div>

        {/* Inventário */}
        <div className="inventory-section">
          <h1>Meu Inventário</h1>
          {selectedSlot && (
            <div className="slot-selection">
              <h3>Selecionar item para {selectedSlot.replace("-", " ")}</h3>
              <button onClick={() => setSelectedSlot(null)}>Cancelar</button>
            </div>
          )}
          <div className="itens-grid">
            {(selectedSlot ? filteredItems : inventario).map((item) => (
              <div className="item-card-modern" key={item.id}>
                <div className="item-image">
                  <img src={item.imagem} alt={item.nome} />
                </div>
                <h2>{item.nome}</h2>
                <p className="item-preco">{item.preco} Ark</p>
                <p className="item-descricao">{item.descricao}</p>
                {selectedSlot ? (
                  <button className="equip-btn-modern" onClick={() => handleEquipItem(item)}>Equipar</button>
                ) : (
                  <button className="sell-btn-modern" disabled={isItemEquipped(item)}>Vender</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
