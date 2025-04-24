import db from "../Conexao.js";
import mysql from "mysql2/promise";

// Criando pool de conexoes
const conexao = mysql.createPool(db);

export const criandoUsuario = async (nome, email, cpf, senha, cep, logradouro, numero, cidade) => {
    console.log("UserModel :: criandoUsuario");

    const sqlEndereco = `INSERT INTO endereco (cep, logradouro, numero, cidade) VALUES (?, ?, ?, ?)`;
    const sqlUsuario = `INSERT INTO user (nome, email, cpf, senha, id_endereco) VALUES (?, ?, ?, ?, ?)`;

    try {
        // 1. Inserir o endereço
        const [resEndereco] = await conexao.query(sqlEndereco, [cep, logradouro, numero, cidade]);
        const id_endereco = resEndereco.insertId;

        // 2. Inserir o usuário com id_endereco
        const [resUsuario] = await conexao.query(sqlUsuario, [nome, email, cpf, senha, id_endereco]);

        if (resUsuario.affectedRows === 0) {
            return [400, { mensagem: "Erro ao cadastrar usuario" }];
        }

        return [201, {
            mensagem: "Usuario cadastrado!!!",
            id_user: resUsuario.insertId,
            id_endereco
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

export const mostrandoUsuario = async () => {
    console.log("UserModel :: mostrandoUsuarios");

    const sql = `
        SELECT 
            u.id_usuario, 
            u.nome, 
            u.email, 
            u.cpf, 
            u.senha,
            e.cep,
            e.logradouro,
            e.numero,
            e.cidade
        FROM user u
        JOIN endereco e ON u.id_endereco = e.id_endereco
    `;
    
    try {
        const [resposta] = await conexao.query(sql);
        return [200, resposta];
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

export const deletarumUsuario = async (id_user) => {
    console.log("UserModel :: deletarUsuario");

    try {
        // 1. Obter o id_endereco do usuário
        const [[usuario]] = await conexao.query(
            `SELECT id_endereco FROM user WHERE id_usuario = ?`,
            [id_user]
        );

        if (!usuario) {
            return [404, { mensagem: "Usuário não encontrado" }];
        }

        //const id_endereco = usuario.id_endereco;

        // 2. Deletar o usuário
        await conexao.query(`DELETE FROM user WHERE id_usuario = ?`, [id_user]);

        // // 3. Deletar o endereço (opcional, se quiser manter dados de endereço, remova essa parte)
        // await conexao.query(`DELETE FROM endereco WHERE id_endereco = ?`, [id_endereco]);

        return [200, { mensagem: "Usuário e endereço deletados com sucesso!" }];
    } catch (error) {
        console.error("Erro ao deletar usuario:", error);
        return [500, { mensagem: "Erro no servidor", erro: error.code }];
    }
};

export const atualizarUmUsuario = async (
    nome, email, cpf, senha,
    cep, logradouro, numero, cidade,
    id_user
) => {
    console.log("UserModel :: atualizarUmUsuario");

    try {
        // 1. Atualizar dados do usuário
        const [[usuario]] = await conexao.query(
            `SELECT id_endereco FROM user WHERE id_usuario = ?`,
            [id_user]
        );

        if (!usuario) {
            return [404, { mensagem: "Usuário não encontrado" }];
        }

        const id_endereco = usuario.id_endereco;

        const sqlUsuario = `UPDATE user SET nome = ?, email = ?, cpf = ?, senha = ? WHERE id_usuario = ?`;
        await conexao.query(sqlUsuario, [nome, email, cpf, senha, id_user]);

        // 2. Atualizar dados do endereço
        const sqlEndereco = `
            UPDATE endereco SET cep = ?, logradouro = ?, numero = ?, cidade = ?
            WHERE id_endereco = ?
        `;
        await conexao.query(sqlEndereco, [cep, logradouro, numero, cidade, id_endereco]);

        return [200, { mensagem: "Usuário e endereço atualizados com sucesso!" }];
    } catch (error) {
        console.error("Erro ao atualizar usuario:", error);
        return [500, { mensagem: "Erro no servidor", erro: error.code }];
    }
};

export const loginUsuario = async (email, senha) => {
    console.log("UserModel :: loginUsuario");

    const sql = `
        SELECT 
            u.id_usuario, u.nome, u.email, u.cpf, u.senha,
            e.cep, e.logradouro, e.numero, e.cidade
        FROM user u
        JOIN endereco e ON u.id_endereco = e.id_endereco
        WHERE u.email = ? AND u.senha = ?
    `;
    const params = [email, senha];
    
    try {
        const [resposta] = await conexao.query(sql, params);
        
        if (resposta.length === 0) {
            return [401, { mensagem: "Email ou senha incorretos" }];
        }

        // Retornando dados do usuário + endereço
        const usuario = resposta[0];
        return [
            200,
            {
                mensagem: "Login realizado com sucesso!",
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nome: usuario.nome,
                    email: usuario.email,
                    cpf: usuario.cpf,
                    endereco: {
                        cep: usuario.cep,
                        logradouro: usuario.logradouro,
                        numero: usuario.numero,
                        cidade: usuario.cidade
                    }
                }
            }
        ];  
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return [500, { mensagem: "Erro no servidor", erro: error.code }];
    }
}
