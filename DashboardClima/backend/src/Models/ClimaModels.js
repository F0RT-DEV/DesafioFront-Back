import db from "../Conexao.js";
import mysql from "mysql2/promise";

// Criando pool de conexoes
const conexao = mysql.createPool(db);

export const criandoLocalETemperatura = async (nome, estado, país, data, horario, temperatura) => {
  console.log("ClimaModels :: criandoLocalETemperatura");

  const sqlLocal = `INSERT INTO local (nome, estado, país) VALUES (?, ?, ?)`;
  const sqlTemperatura = `INSERT INTO temperatura (data, horario, temperatura, id_Local) VALUES (?, ?, ?, ?)`;

  try {
      // 1. Inserir o local
      const [resLocal] = await conexao.query(sqlLocal, [nome, estado, país]);
      const id_Local = resLocal.insertId;

      // 2. Inserir a temperatura com id_Local
      const [resTemperatura] = await conexao.query(sqlTemperatura, [data, horario, temperatura, id_Local]);

      if (resTemperatura.affectedRows === 0) {
          return [400, { mensagem: "Erro ao cadastrar temperatura" }];
      }

      return [201, {
          mensagem: "Local e temperatura cadastrados!!!",
          id_local: id_Local,
          id_temperatura: resTemperatura.insertId
      }];

  } catch (error) {
      console.error({
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMessage,
      });
      return [500, {
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMessage
      }];
  }
}

export const listarLocaisETemperaturas = async () => {
  console.log("ClimaModels :: listarLocaisETemperaturas");

  const sql = `
      SELECT l.id_Local AS id_Local, l.nome, l.estado, l.país, t.data, t.horario, t.temperatura
      FROM local l
      JOIN temperatura t ON l.id_Local = t.id_Local
  `;

  try {
      const [resultados] = await conexao.query(sql);
      return [200, resultados];
  } catch (error) {
      console.error({
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMessage,
      });
      return [500, {
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMessage
      }];
  }
};

export const atualizarLocalETemperatura = async (id_Local, nome, estado, país, data, horario, temperatura) => {
  console.log("LocalModel :: atualizarLocalETemperatura");

  const sqlLocal = `UPDATE local SET nome = ?, estado = ?, país = ? WHERE id_Local = ?`;
  const sqlTemperatura = `UPDATE temperatura SET data = ?, horario = ?, temperatura = ? WHERE id_Local = ?`; // Aqui você pode usar o mesmo id_Local

  try {
      // Atualizar o local
      const [resLocal] = await conexao.query(sqlLocal, [nome, estado, país, id_Local]);

      // Atualizar a temperatura
      const [resTemperatura] = await conexao.query(sqlTemperatura, [data, horario, temperatura, id_Local]);

      if (resLocal.affectedRows === 0 && resTemperatura.affectedRows === 0) {
          return [404, { mensagem: "Nenhum registro encontrado para atualizar" }];
      }

      return [200, {
          mensagem: "Local e temperatura atualizados com sucesso!",
          id_local: id_Local
      }];

  } catch (error) {
      console.error({
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMessage,
      });
      return [500, {
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMessage
      }];
  }
};

export const deletarLocalETemperatura = async (id_Local) => {
  console.log("LocalModel :: deletarLocalETemperatura");

  const sqlTemperatura = `DELETE FROM temperatura WHERE id_temperatura = ?`;
  const sqlLocal = `DELETE FROM local WHERE id_Local = ?`;

  try {
      // 1. Deletar a temperatura associada ao local
      const [resTemperatura] = await conexao.query(sqlTemperatura, [id_Local]);

      // 2. Deletar o local
      const [resLocal] = await conexao.query(sqlLocal, [id_Local]);

      if (resLocal.affectedRows === 0 && resTemperatura.affectedRows === 0) {
          return [404, { mensagem: "Nenhum local encontrado para deletar" }];
      }

      return [200, { mensagem: "Local e temperatura deletados com sucesso!" }];
  } catch (error) {
      console.error({
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMessage,
      });
      return [500, {
          mensagem: "Erro Servidor",
          code: error.code,
          sql: error.sqlMessage
      }];
  }
};