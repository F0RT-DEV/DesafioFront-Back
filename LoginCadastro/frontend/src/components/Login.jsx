import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState(""); 
  const [senha, setSenha] = useState(""); 
  const [mensagem, setMensagem] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", { usuario, senha });
  
      if (response.status === 200) {
        const data = response.data;
  
        const userResponse = await axios.get("http://localhost:3000/usuario");
  
        console.log("Resposta da API /usuario:", userResponse.data);
  
        const allUsers = userResponse.data.resposta; 
  
        const userData = allUsers.find((u) => u.usuario === usuario);
  
        if (!userData) {
          setMensagem("Usuário não encontrado nos dados.");
          return;
        }
  
        setMensagem(data.mensagem);
  
        navigate("/perfil", { state: { userData } });
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setMensagem("Erro ao fazer login.");
    }
  };
  
  

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Acessar Sistema</h1>
        <p className="card-subtitle">Bem-vindo!</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="input-container">
          <User  className="input-icon" size={20} />
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

        <button type="submit" className="button">
          Entrar
        </button>

        {mensagem && (
          <p className="mensagem-erro">{mensagem}</p> 
        )}
      </form>

      <div className="toggle-form">
        Não tem conta?{' '}
        <button onClick={() => navigate("/cadastro")} className="toggle-link">
          Cadastre-se
        </button>
      </div>
    </div>
  );
}

export default Login;