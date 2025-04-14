import db from "../conexao.js";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

// Criando pool de conexoes
const conexao = mysql.createPool(db);

export const criandoUsuario = async (nome, usuario, senha, tipo) => {
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
    return [201, { mensagem: "Usuario cadastrado!!!" }];
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

export const mostrandoUsuarios = async () => {
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

export const atualizarUsuario = async (nome, usuario, senha, tipo,id_usuario) => {
  console.log("UsuarioModel :: atualizarUsuarios");
  //Encriptando senha
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salt);

  const sql = `UPDATE usuarios SET nome=?, usuario=?, senha=?, tipo=? WHERE id_usuario=?`;
  const params = [nome, usuario, hash, tipo,id_usuario];  
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

export const deletarUsuario = async (id_usuario)=>{
    console.log("UsuarioModel :: deletarUsuario"); 
    const sql = `DELETE FROM usuarios WHERE id_usuario=?`;
    const params = [id_usuario];

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

export const vericarUsuarioSenha = async (usuario,senha) =>{
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
      if (autenticado){
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

// export const vericarUsuarioSenha = async (usuario,senha) =>{
//     console.log("UsuarioModel :: vericarUsuarioSenha");
//     const sql = `SELECT * FROM usuarios WHERE usuario=?`;
//     const params = [usuario];
//     try {
//         const [resposta] = await conexao.query(sql, params);
//         if (resposta.length<1){
//             return [401, { mensagem: "Usuario não encontrado!!!" }];    
//         }
//         const hash = resposta[0].senha;
//         const autenticado = bcrypt.compareSync(senha,hash);
//         if (autenticado){
//             return [200, {mensagem:"usuário logado",id_usuario:resposta[0].id_usuario}] 
//         }
//     } catch (error) {
//         console.error({
//             mensagem: "Erro Servidor",
//             code: error.code,
//             sql: error.sqlMesssage,
//           });
//           return [
//             500,
//             { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMesssage },
//           ];    
//     }    
// }