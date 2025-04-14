import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
//import './Cadastro.css'; // Import your CSS file here

const Cadastro = ({ onRegister, onSwitchToLogin}) => {
   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
    nome: '',
    usuario: '',
    senha: '',
    tipo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Criar Conta</h1>
        <p className="card-subtitle">Preencha seus dados para começar</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <Mail className="input-icon" size={20} />
          <input
            type="text"
            placeholder="Nome completo"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
        </div>

        <div className="input-container">
          <User className="input-icon" size={20} />
          <input
            type="text"
            placeholder="Usuário"
            className="input-field"
            value={formData.usuario}
            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
          />
        </div>

        <div className="input-container">
          <Lock className="input-icon" size={20} />
          <input
            type={showPassword ? 'text' : 'senha'}
            placeholder="Senha"
            className="input-field"
            value={formData.senha}
            onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="input-container">
          <Lock className="input-icon" size={20} />
          <input
            type="text"
            placeholder="Código de Administrador"
            className="input-field"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          />
        </div>

        <button type="submit" className="button">
          Cadastrar
        </button>
      </form>

      <div className="toggle-form">
        Já tem conta?{' '}
        <button onClick={onSwitchToLogin} className="toggle-link">
          Fazer Login
        </button>
      </div>
    </div>
  )
}

export default Cadastro
