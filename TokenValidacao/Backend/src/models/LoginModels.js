import db from "../Conexao.js";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// Criando pool de conexoes
const conexao = mysql.createPool(db);

export const criouUsuario = async (nome, usuario, senha, tipo) => {
  console.log("UsuarioModel :: criandoUsuario");
  //Encriptando senha
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);
  const sql = `INSERT INTO usuarios
        (nome,usuario,senha,tipo) VALUES
        (?,?,?,?)        
    `;
  const params = [nome, usuario, hash, tipo];

  try {
    const [resposta] = await conexao.query(sql, params);
    const [usuarios] = await conexao.query(`SELECT nome, usuario, tipo FROM usuarios WHERE id_usuarios =?`, [resposta.insertId]);
    const usuarioCriado = usuarios[0];
    
    return [201, { mensagem: "Usuario cadastrado!!!", usuario: usuarioCriado }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMesssage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMesssage },
    ];
  }
};

export const mostrouUsuarios = async () => {
  console.log("UsuarioModel :: mostrandoUsuarios");
  const sql = `SELECT * FROM usuarios`;
  try {
    const [resposta] = await conexao.query(sql);
    return [200, { resposta }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMesssage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMesssage },
    ];
  }
};

export const atualizouUsuario = async (nome, usuario, senha, tipo,id_usuarios) => {
  console.log("UsuarioModel :: atualizarUsuarios");
  //Encriptando senha
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  const sql = `UPDATE usuarios SET nome=?, usuario=?, senha=?, tipo=? WHERE id_usuarios=?`;
  const params = [nome, usuario, hash, tipo,id_usuarios];  
  try {
    const [resposta] = await conexao.query(sql, params);
    
    if (resposta.affectedRows<1){
        return [404, { mensagem: "Usuario não encontrado!!!" }];
    }

    return [200, { mensagem: "Usuario atualizado!!!" }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMesssage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMesssage },
    ];
  }
};

export const deletouUsuario = async (id_usuarios)=>{
    console.log("UsuarioModel :: deletarUsuario"); 
    const sql = `DELETE FROM usuarios WHERE id_usuarios=?`;
    const params = [id_usuarios];
    try {
        const [resposta] = await conexao.query(sql, params);
        if (resposta.affectedRows<1){
            return [404, { mensagem: "Usuario não encontrado!!!" }];
        }
        return [200, { mensagem: "Usuario deletado!!!" }];
      } catch (error) {
        console.error({
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMesssage,
        });
        return [
          500,
          { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMesssage },
        ];
      }

}

export const vericarUsuarioSenha = async (usuario, senha) =>{
  console.log("UsuarioModel :: vericarUsuarioSenha");
  const sql = `SELECT * FROM usuarios WHERE usuario=?`;
  const params = [usuario];
  
  try {
      const [resposta] = await conexao.query(sql, params);
      if (resposta.length<1){
          return [401, { mensagem: "Usuario não encontrado!!!" }];    
      }

      const hash = resposta[0].senha;
      const autenticado = bcrypt.compareSync(senha,hash);

      console.log("Hash armazenado:", hash);
      console.log("Senha fornecida:", senha);
      console.log("Senha comparada:", autenticado);

      if(autenticado){
        return [200, {mensagem:"usuário logado",id_usuario:resposta[0].id_usuario}];
    } else {
        return [401, { mensagem: "Senha incorreta!" }];
    }
  } catch (error) {
      console.error({
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMesssage,
        });
        return [
          500,
          { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMesssage },
        ];    
  }    
}