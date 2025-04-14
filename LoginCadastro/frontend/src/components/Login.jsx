import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usuario: '',
    senha: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Acessar Sistema</h1>
        <p className="card-subtitle">Bem-vindo de volta!</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
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
            type={showPassword ? 'text' : 'password'}
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

        <button type="submit" className="button">
          Entrar
        </button>
      </form>

      <div className="toggle-form">
        Não tem conta?{' '}
        <button onClick={onSwitchToRegister} className="toggle-link">
          Cadastre-se
        </button>
      </div>
    </div>
  )
}

export default Login
