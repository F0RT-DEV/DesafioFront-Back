import db from "../conexao.js";
import mysql from "mysql2/promise";

//criando um pool com database inet
const conexao = mysql.createPool(db);

//criando foto
export const criarFoto = async (caminho, alternativo) => {
  console.log("FotoModel :: CriandoFoto");
  const sql = `INSERT INTO fotos (caminho,alternativo) VALUES (?,?)`;
  const params = [caminho, alternativo];

  try {
    const resposta = await conexao.execute(sql, params);
    return [201, { mensagem: "Foto criada com sucesso" }];
  } catch (error) {
    console.error({ mensagem: "Erro Servidor", code: error.code });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
  }
};

//Mostrando fotos
export const mostrarFotos = async () => {
  console.log("FotoModel :: MostrarFotos");
  const sql = `SELECT * FROM Fotos`;

  try {
    const [resposta] = await conexao.query(sql);
    return [200, resposta]; //[resposta] vai passar o resposta do banco
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
  }
};

//atualizar a descrição da foto
export const atualizarFoto = async (alternativo, id_foto) => {
  console.log("FotoModel :: AtualizarFoto");

  const sql = `UPDATE Fotos SET alternativo = ? WHERE id_foto = ?`;
  const params = [alternativo, id_foto];

  try {
    const [resposta] = await conexao.query(sql, params);
    if (resposta.affectedRows < 1) {
      return [404, { mensagem: "Foto não encontrada" }];
    }
    return [200, { mensagem: "Descrição atualizado" }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
  }
};

export const deletarFoto = async (id_foto) => {
  console.log("FotoModel :: DeletarFoto");
  const sql = `DELETE FROM Fotos WHERE id_foto = ?`;
  const params = [id_foto];

  try {
    const [resposta] = await conexao.query(sql, params);
    if (resposta.affectedRows < 1) {
      return [404, { mensagem: "Foto não encontrada" }];
    }
    return [200, { mensagem: "Imagem deletada" }];
  } catch (error) {
    console.error({
      mensagem: "Erro Servidor",
      code: error.code,
      sql: error.sqlMessage,
    });
    return [
      500,
      { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
    ];
  }
};

export const mostrarUmaFoto = async(id_foto) => {
    console.log('FotoController :: mostrarUmaFoto')
    const sql = `SELECT * FROM fotos WHERE id_foto = ?`
    const params = [id_foto]

    try {
        const [resposta] = await conexao.query(sql,params)
        if(resposta.length<1){
            return [404,{mensagem: "Imagem não encontrada"}]
        }
        return [200,resposta[0]]
    } catch (error) {
        return [
            500,
            { mensagem: "Erro Servidor", code: error.code, sql: error.sqlMessage },
          ];
    }
}