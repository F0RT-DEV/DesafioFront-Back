import { atualizarUmUsuario, criandoUsuario, deletarumUsuario, loginUsuario, mostrandoUsuario } from "../models/UserModel.js";

 
export const createUsuario = async (req, res) => {
    console.log("UsuarioController :: createUsuario");
    const { nome, email, cpf, senha, endereco } = req.body;

    // Garantindo que todos os campos do endereço existam
    const { cep, logradouro, numero, cidade } = endereco;

    try {
        const [status, resposta] = await criandoUsuario(
            nome, email, cpf, senha, cep, logradouro, numero, cidade
        );

        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar usuário" });
    }
};

 export const readUsuario = async (req, res) => {
    console.log("UserController :: readUsuario");

    try {
        const [status, resposta] = await mostrandoUsuario();
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao mostrar usuários" });
    }
}

export const updateUsuario = async (req, res) => {
    console.log("UserController :: updateUsuario");

    const { nome, email, cpf, senha, endereco } = req.body;
    const { cep, logradouro, numero, cidade } = endereco;
    const { id_user } = req.params;

    try {
        const [status, resposta] = await atualizarUmUsuario(
            nome, email, cpf, senha,
            cep, logradouro, numero, cidade,
            id_user
        );

        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
};


export const deleteUsuario = async (req, res) => {
    console.log("UserController :: deleteUsuario");
    const {id_user} = req.params;
    try {
        const [status, resposta] = await deletarumUsuario(id_user);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "erro ao deletar usuario" });
    }
}

export const login = async (req, res) => {
    console.log("UserController :: login");

    const { email, senha } = req.body;

    try {
        const [status, resposta] = await loginUsuario(email, senha);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao fazer login" });
    }
}
