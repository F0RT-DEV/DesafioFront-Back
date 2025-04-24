import { atualizarUsuario, criandoUsuario, deletarUsuario, mostrandoUsuarios, vericarUsuarioSenha } from "../models/UsuarioModel.js";

export const createUsuario = async (req, res) => {
    console.log("UsuarioController :: createUsuario");
    const {nome, usuario, senha, tipo} = req.body;
    
    try {
        const [status, resposta] = await criandoUsuario(nome, usuario, senha, tipo);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar usuário" });
        
    }
}

export const readUsuario = async (req, res) => {
    console.log("UsuarioController :: readUsuario");
    
    try {
        const [status, resposta] = await mostrandoUsuarios();
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao mostrar usuários" });
    }
}

export const upedateUsuario1 = async (req, res) => {
    console.log("UsuarioController :: upedateUsuario");
    const {nome, usuario, senha, tipo} = req.body;
    const {id_usuario} = req.params;
    
    try {
        const [status, resposta] = await atualizarUsuario(nome, usuario, senha, tipo,id_usuario);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar usuários" });
        
    }
}

export const deleteUsuario = async (req, res) => {
    console.log("UsuarioController :: deleteUsuario");
    const {id_usuario} = req.params;
    //console.log(id_usuario);
    try {
      const [status, resposta] = await deletarUsuario(id_usuario);
      return res.status(status).json(resposta);    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "erro ao deletar usuario" });  
    }
  };

  export const login = async (req, res) => {
    console.log("UsuarioController :: login");
    const {usuario, senha} = req.body;
  
    try {
      console.log("Requisição recebida:", req.body);
      const [status, resposta] = await vericarUsuarioSenha(usuario, senha);
      console.log("Resposta da verificação:", resposta);
      res.status(status).json(resposta);
    } catch (error) {
      console.error("ERRO no login:", error);
      res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  };