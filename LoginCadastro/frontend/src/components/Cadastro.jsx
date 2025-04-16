import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cadastro = ({ onSwitchToLogin}) => {
   const [showPassword, setShowPassword] = useState(false);
   const [nome, setNome] = useState("");
   const [usuario, setUsuario] = useState(""); 
   const [senha, setSenha] = useState(""); 
   const [mensagem, setMensagem] = useState("");
   const [tipo, setTipo] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/usuario", { nome, usuario, senha, tipo });
  
      if (response.status === 200 || response.status === 201) {
        const { mensagem, usuario: userData } = response.data;
  
        if (!userData) {
          setMensagem("Usuário não retornado.");
          return;
        }
  
        console.log("Usuário cadastrado:", userData);
        setMensagem(mensagem);
        navigate("/perfil", { state: { userData } });
      }
    } catch (error) {
      console.error("Erro no cadastro", error);
      setMensagem("Erro ao se Cadastrar.");
    }
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
             value={nome}
             onChange={(e) => setNome(e.target.value)} 
             required
          />
        </div>

        <div className="input-container">
          <User className="input-icon" size={20} />
          <input
             type="text"
             placeholder="Usuário"
             className="input-field"
             value={usuario}
             onChange={(e) => setUsuario(e.target.value)} 
             required
          />
        </div>

        <div className="input-container">
          <Lock className="input-icon" size={20} />
          <input
             type={showPassword ? 'text' : 'password'}
             placeholder="Senha"
             className="input-field"
             value={senha}
             onChange={(e) => setSenha(e.target.value)} 
             required
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
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </div>

        <button type="submit" className="button">
          Cadastrar
        </button>
        {mensagem && (
          <p className="mensagem-erro">{mensagem}</p> 
        )}
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
