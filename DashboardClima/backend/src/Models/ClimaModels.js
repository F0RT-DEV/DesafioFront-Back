import db from "../Conexao.js";
import mysql from "mysql2/promise";

// Criando pool de conexoes
const conexao = mysql.createPool(db);

// Função para criar local e temperatura
export const criandoLocalETemperatura = async (nome, estado, pais, data, horario, temperatura) => {
    console.log("ClimaModels :: criandoLocalETemperatura");
    console.log("Dados recebidos:", { nome, estado, pais, data, horario, temperatura });

    try {
        // Verificar se o local já existe
        const sqlVerifica = `SELECT Id_Local FROM local WHERE nome = ? AND estado = ? AND pais = ?`;
        const [resultados] = await conexao.query(sqlVerifica, [nome, estado, pais]);

        let id_Local;

        if (resultados.length > 0) {
            // Já existe
            id_Local = resultados[0].Id_Local;
        } else {
            // Inserir local novo
            const sqlLocal = `INSERT INTO local (nome, estado, pais) VALUES (?, ?, ?)`;
            const [resLocal] = await conexao.query(sqlLocal, [nome, estado, pais]);
            id_Local = resLocal.insertId;
        }

        // Inserir temperatura
        const sqlTemperatura = `
            INSERT INTO temperatura (id_Local, data, horario, temperatura) 
            VALUES (?, ?, ?, ?)
        `;
        const [resTemp] = await conexao.query(sqlTemperatura, [id_Local, data, horario, temperatura]);

        return [201, { mensagem: "Local e temperatura cadastrados!", pais: pais }];
    } catch (error) {
        console.error("Erro ao criar local e temperatura:", error);
        return [500, { erro: "Erro interno ao salvar dados" }];
    }
}


// Função para listar locais e temperaturas
export const listarLocaisETemperaturas = async () => {
    console.log("ClimaModels :: listarLocaisETemperaturas");
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
    `;
    const [dados] = await conexao.query(sql);
    return [200, dados];
}

// Atualiza local e temperatura pelo ID do local
export const atualizarLocalETemperatura = async(id_Local, nome, estado, pais, data, horario, temperatura)=> {
    console.log("ClimaModels :: atualizarLocalETemperatura");
    try {
        const paisSanitizado = pais.replace(/['"]/g, '');

        const sqlUpdateLocal = `
            UPDATE local 
            SET nome = ?, estado = ?, pais = ? 
            WHERE id_Local = ?
        `;
        await conexao.query(sqlUpdateLocal, [nome, estado, paisSanitizado, id_Local]);

        const sqlUpdateTemp = `
            UPDATE temperatura 
            SET data = ?, horario = ?, temperatura = ? 
            WHERE id_Local = ?
        `;
        await conexao.query(sqlUpdateTemp, [data, horario, temperatura, id_Local]);

        return [200, { mensagem: "Local e temperatura atualizados com sucesso" }];
    } catch (error) {
        console.error("Erro ao atualizar:", error);
        return [500, { erro: "Erro ao atualizar os dados" }];
    }
}

// Deleta local e temperatura pelo ID do local
export const deletarLocalETemperatura = async (id_Local)=> {
    console.log("ClimaModels :: deletarLocalETemperatura");
    try {
        await conexao.query(`DELETE FROM temperatura WHERE id_Local = ?`, [id_Local]);
        await conexao.query(`DELETE FROM local WHERE id_Local = ?`, [id_Local]);

        return [200, { mensagem: "Local e temperatura deletados com sucesso" }];
    } catch (error) {
        console.error("Erro ao deletar:", error);
        return [500, { erro: "Erro ao deletar os dados" }];
    }
}

// Lista todos os registros da tabela temperatura
export const listarTodosOsRegistros = async() => {
    console.log("ClimaModels :: listarTodosOsRegistros");
    try {
        const sql = `
            SELECT 
                t.id_temperatura,
                l.nome AS local,
                l.estado,
                l.pais,
                DATE_FORMAT(t.data, '%d/%m/%Y') AS data,
                t.horario,
                t.temperatura
            FROM temperatura t
            JOIN local l ON t.id_Local = l.id_Local
            ORDER BY t.id_temperatura DESC, t.data DESC, t.horario DESC
        `;
        const [dados] = await conexao.query(sql);
        
        // Verifica se todos os IDs existem
        const recordsWithMissingIds = dados.filter(record => !record.id_temperatura);
        if (recordsWithMissingIds.length > 0) {
            console.error("Registros sem ID encontrados:", recordsWithMissingIds);
        }
        
        return [200, dados];
    } catch (error) {
        console.error("Erro no model ao listar registros:", error);
        return [500, null];
    }
}

// Retorna o ID do local a partir de um ID de temperatura
export const buscarIdLocalPorIdTemperatura = async (id_temperatura) => {
    console.log("ClimaModels :: buscarIdLocalPorIdTemperatura");
    const sql = `SELECT id_Local FROM temperatura WHERE id_temperatura = ?`;
    const [result] = await conexao.query(sql, [id_temperatura]);

    if (result.length > 0) {
        return result[0].id_Local;
    } else {
        return null;
    }
}

// Deleta um registro da tabela temperatura pelo ID// ClimaModels.js
export const deletarRegistroPorIdTemperatura = async(id_temperatura) => {
    console.log("ClimaModels :: deletarRegistroPorIdTemperatura");
    try {
        // Primeiro obtém o id_Local associado
        const [local] = await conexao.query(
            `SELECT id_Local FROM temperatura WHERE id_temperatura = ?`, 
            [id_temperatura]
        );
        
        if (!local || local.length === 0) {
            return [404, { mensagem: "Registro não encontrado" }];
        }

        const id_Local = local[0].id_Local;
        
        // Depois deleta temperatura e local
        await conexao.query(`DELETE FROM temperatura WHERE id_temperatura = ?`, [id_temperatura]);
        await conexao.query(`DELETE FROM local WHERE id_Local = ?`, [id_Local]);

        return [200, { mensagem: "Registro deletado com sucesso" }];
    } catch (error) {
        console.error("Erro ao deletar:", error);
        return [500, { erro: "Erro ao deletar os dados" }];
    }
}

// Lista locais com limite de quantidade
export const buscarLocaisComTemperaturaLimitado = async (limit) =>{
    const sql = `
        SELECT 
            l.id_Local, l.nome, l.estado, l.pais,
            DATE_FORMAT(t.data, '%d/%m/%Y') AS data_formatada,
            DATE_FORMAT(t.horario, '%H:%i') AS horario_formatado,
            t.temperatura
        FROM local l
        JOIN temperatura t ON l.id_Local = t.id_Local
        ORDER BY t.id_temperatura DESC, t.data DESC, t.horario DESC
        LIMIT ?
    `;
    const [dados] = await conexao.query(sql, [limit]);
    return dados;
}
