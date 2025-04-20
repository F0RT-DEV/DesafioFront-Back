import db from "../Conexao.js";
import mysql from "mysql2/promise";

const conexao = mysql.createPool(db);

export const criarPessoa = async (nome) => {
  console.log("PessoaModel :: criarPessoa");
  const sql = `INSERT INTO pessoa (nome) VALUES (?)`;
  const params = [nome];
 
  try {
    const [resposta] = await conexao.query(sql, params);
    return [
      201,
      {
        mensagem: "Pessoa cadastrada com sucesso!",
        id_pessoa: resposta.insertId,
      },
    ];
  } catch (error) {
    console.error("Erro ao salvar pessoa:", error);
    return [500, { mensagem: "Erro no servidor", erro: error.code }];
  }
};

export const listarPessoas = async () => {
  const sql = `SELECT id_pessoa, nome FROM pessoa`;
  console.log("PessoaModel :: listarPessoas");

  try {
    const [resposta] = await conexao.query(sql);
    return [200, resposta];
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

export const deletarPessoa = async (id_pessoa) => {
    console.log("PessoaModel :: deletarPessoa");
    const params = [id_pessoa];

    const sql = `DELETE FROM pessoa WHERE id_pessoa = ?`;
    try {
      const [resposta] = await conexao.query(sql, params);
      if (resposta.affectedRows === 0) {
        return [404, { mensagem: "Pessoa não encontrada" }];
      }
      return [200, { mensagem: "Pessoa deletada com sucesso!" }];
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
      return [500, { mensagem: "Erro no servidor", erro: error.code }];
    }
  };

  export const atualiazarPessoa = async (nome, id_pessoa) => {
    console.log("PessoaModel :: atualizarPessoa");
    const params = [nome, id_pessoa];
  
    const sql = `UPDATE pessoa SET nome = ? WHERE id_pessoa = ?`;
    try {
      const [resposta] = await conexao.query(sql, params);
      if (resposta.affectedRows === 0) {
        return [404, { mensagem: "Pessoa não encontrada" }];
      }
      return [200, { mensagem: "Pessoa atualizada com sucesso!" }];
    } catch (error) {
      console.error("Erro ao atualizar pessoa:", error);
      return [500, { mensagem: "Erro no servidor", erro: error.code }];
    }
  }