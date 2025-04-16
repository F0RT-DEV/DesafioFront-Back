import React from 'react'
import { useLocation } from 'react-router-dom';
import { UserCircle2, LogOut } from 'lucide-react';

const Perfil = ({ onLogout }) => {
  const location = useLocation();
  const { userData } = location.state || {};

  if (!userData) {
    return <p>Dados do usuário não disponíveis.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <UserCircle2 size={64} className="profile-icon" />
          <h1 className="profile-title">
            Bem-vindo, {userData.nome}!
          </h1>
        </div>

        <div className="profile-info">
          <div className="info-item">
            <p className="info-label">Nome</p>
            <p className="info-value">{userData.nome}</p>
          </div>
          
          <div className="info-item">
            <p className="info-label">Usuário</p>
            <p className="info-value">@{userData.usuario}</p>
          </div>
          
          <div className="info-item">
            <p className="info-label">Tipo</p>
            <p className="info-value">{userData.tipo}</p>
          </div>
        </div>

        <button onClick={onLogout} className="logout-button">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}

export default Perfil;

