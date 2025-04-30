import db from "../Conexao.js";
import mysql from "mysql2/promise";

// Criando pool de conexoes
const conexao = mysql.createPool(db);

export const Cadastrarlocais = async (nome, estado, pais, data, hora, temperatura) => {
    console.log("ClimaModels :: Cadastrarlocais");
    
    // Iniciar uma transação para garantir a atomicidade das operações
    const connection = await conexao.getConnection();
    await connection.beginTransaction();
  
    try {
      // 1. Primeiro, inserir na tabela local
      const sqlLocal = `INSERT INTO local (nome, estado, pais) VALUES (?, ?, ?)`;
      const paramsLocal = [nome, estado, pais];
      
      const [resultadoLocal] = await connection.query(sqlLocal, paramsLocal);
      const idLocal = resultadoLocal.insertId; // Pegamos o ID gerado
  
      // 2. Depois, inserir na tabela temperatura
      const sqlTemperatura = `INSERT INTO temperatura 
                            (data, horario, temperatura, id_Local) 
                            VALUES (?, ?, ?, ?)`;
      const paramsTemperatura = [data, hora, temperatura, idLocal];
      
      await connection.query(sqlTemperatura, paramsTemperatura);
  
      // Commit da transação se tudo ocorrer bem
      await connection.commit();
      connection.release();
  
      return [201, { mensagem: "Local e temperatura cadastrados com sucesso!", idLocal }];
      
    } catch (error) {
      // Rollback em caso de erro
      await connection.rollback();
      connection.release();
  
      console.error({
        mensagem: "Erro no Servidor",
        code: error.code,
        sqlMessage: error.sqlMessage, // Corrigido o nome da propriedade
      });
  
      return [
        500, 
        { 
          mensagem: "Erro no Servidor", 
          code: error.code, 
          sqlMessage: error.sqlMessage 
        }
      ];
    }
  }


export const buscarDadosClima = async (id_local) => {
    const connection = await conexao.getConnection();
    
    try {
        const sql = `
            SELECT 
                l.id_Local,
                l.nome,
                l.estado,
                l.pais,
                t.id_temperatura,
                t.data,
                t.horario,
                t.temperatura
            FROM local l
            JOIN temperatura t ON l.id_Local = t.id_Local
            WHERE l.id_Local = ?
            ORDER BY t.data DESC, t.horario DESC
            LIMIT 1
        `;
        
        const [resultados] = await connection.query(sql, [id_local]);
        connection.release();
        
        if (resultados.length === 0) {
            return [404, { mensagem: "Local não encontrado" }];
        }
        
        return [200, resultados[0]];
        
    } catch (error) {
        connection.release();
        console.error("Erro ao buscar dados do clima:", error);
        return [500, { 
            mensagem: "Erro no servidor",
            ...(process.env.NODE_ENV === 'development' && {
                detalhes: error.message,
                sqlMessage: error.sqlMessage
            })
        }];
    }
}