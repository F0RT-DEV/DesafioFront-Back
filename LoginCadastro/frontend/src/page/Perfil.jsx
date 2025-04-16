import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserCircle2, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';

const Perfil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {};

  const handleExit = () => {
    Swal.fire({
      title: 'Tem certeza que deseja sair?',
      text: "Você será redirecionado para o login.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
      background: 'rgba(255, 255, 255, 0.9)',
      color: '#1f2937',
      backdrop: `
        rgba(0, 0, 0, 0.4)
        left top
        no-repeat
      `,
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'button',
        cancelButton: 'button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

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

        <button onClick={handleExit} className="logout-button">
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};

export default Perfil;


