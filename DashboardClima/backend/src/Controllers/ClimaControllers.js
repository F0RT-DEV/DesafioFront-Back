import { atualizarLocalETemperatura, criandoLocalETemperatura, deletarLocalETemperatura, listarLocaisETemperaturas } from "../Models/ClimaModels.js";


export const createLocalETemperatura = async (req, res) => {
    console.log("ClimaControllers :: createLocalETemperatura");
    const { nome, estado, país, data, horario, temperatura } = req.body;

    try {
        const [status, resposta] = await criandoLocalETemperatura(
            nome, estado, país, data, horario, temperatura
        );

        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao criar local e temperatura" });
    }
};

export const getLocaisETemperaturas = async (req, res) => {
    console.log("ClimaControllers :: getLocaisETemperaturas");
  
    try {
        const [status, resposta] = await listarLocaisETemperaturas();
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao listar locais e temperaturas" });
    }
};

export const updateLocalETemperatura = async (req, res) => {
    console.log("ClimaControllers :: updateLocalETemperatura");
    
    // Extraindo o ID da URL
    const { id_locais } = req.params; // Este é o ID do local
    const { nome, estado, país, data, horario, temperatura } = req.body; // Campos a serem atualizados

    try {
        const [status, resposta] = await atualizarLocalETemperatura(
            id_locais, nome, estado, país, data, horario, temperatura
        );

        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar local e temperatura" });
    }
};

export const deleteLocalETemperatura = async (req, res) => {
    console.log("ClimaControllers :: deleteLocalETemperatura");
    const { id_Local } = req.params;

    try {
        const [status, resposta] = await deletarLocalETemperatura(id_Local);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar local e temperatura" });
    }
};