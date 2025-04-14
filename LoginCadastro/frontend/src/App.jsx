import React, { useState } from 'react';
//import { User, Lock, Mail, UserCircle2, Eye, EyeOff } from 'lucide-react';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Perfil from './page/Perfil';
import axios from 'axios';


function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async (formData) => {
    const { usuario, senha } = formData;
    try {
      const response = await axios.post("http://localhost:3000/login", { usuario, senha });
      if (response.status === 200) {
        const data = response.data;
        setUserData({
          usuario,
          id_usuario: data.id_usuario,
          type: "admin",
        });
        setIsLoggedIn(true);
        return {}; // sucesso
      }
    } catch (error) {
      const mensagem = error.response?.data?.mensagem || "Erro na conexão com o servidor.";
      return { error: mensagem };
    }
  };

// const handleCadastro = async (formData) => {
//   const { nome, usuario, senha, tipo } = formData;
//   try {
//     const response = await axios.post("http://localhost:3000/usuario", { nome, usuario, senha, tipo });
//     if (response.status === 201) {
//       return {}; // sucesso
//     }
//   } catch (error) {
//     const mensagem = error.response?.data?.mensagem || "Erro na conexão com o servidor.";
//     return { error: mensagem };
//   }

  const handleRegister = (data) => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  if (isLoggedIn && userData) {
    return <Perfil userData={userData} onLogout={handleLogout} />;
  }
  return (
    <div className="container">
      {isLogin ? (
        <Login onLogin={handleLogin} onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Cadastro onRegister={handleRegister} onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  )
}

export default App
