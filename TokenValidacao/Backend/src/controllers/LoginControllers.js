import { atualizouUsuario, criouUsuario, deletouUsuario, mostrouUsuarios, vericarUsuarioSenha } from "../models/LoginModels.js";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_KEY;
console.log("Chave secreta carregada:", secret);

export const createUsuario = async (req, res) => {
    console.log("UsuarioController :: createUsuario");
    const {nome, usuario, senha, tipo} = req.body;
    
    try {
        const [status, resposta] = await criouUsuario(nome, usuario, senha, tipo);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar usuário" });
        
    }
}

export const readUsuario = async (req, res) => {
    console.log("UsuarioController :: readUsuario");
    
    try {
        const [status, resposta] = await mostrouUsuarios();
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao mostrar usuários" });
    }
}

export const updateUsuario = async (req, res) => {
    console.log("LoginController :: updateUsuario");
    const {nome, usuario, senha, tipo} = req.body;
    const {id_usuarios} = req.params;
    
    try {
        const [status, resposta] = await atualizouUsuario(nome, usuario, senha, tipo,id_usuarios);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar usuários" });
        
    }
}

export const deleteUsuario = async (req, res) => {
    console.log("LoginController :: deleteUsuario");
    const {id_usuarios} = req.params;
    //console.log(id_usuario);
    try {
      const [status, resposta] = await deletouUsuario(id_usuarios);
      return res.status(status).json(resposta);    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: "erro ao deletar usuario" });  
    }
  };

export const login = async (req, res) => {
  console.log("UsuarioController :: login");
  const { usuario, senha } = req.body;

  try {
    const [status, resposta] = await vericarUsuarioSenha(usuario, senha);
    //Cria um token com o id e o expiresIn informa o tempo de validade
    const token = jwt.sign({ id_usuarios: resposta.id_usuarios }, secret, {
      expiresIn: 100,
    });
    if (status === 200){
      return res.status(status).json({token});
    }
    return res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "erro ao logar" });
  }
};

  //exemplo exemplo do uso de uma rota autenticada
export const verificaToken = (req,res,next) =>{
  const token = req.headers['x-access-token'];
  jwt.verify(token,secret, (error,decoded)=>{
    if (!error){
      //return res.status(200).json(decoded);
      next()
    }else{
      return res.status(401).json(error);
    }
  });
}