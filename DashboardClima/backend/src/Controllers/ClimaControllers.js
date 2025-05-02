import {  atualizarLocalETemperatura, buscarIdLocalPorIdTemperatura, buscarLocaisComTemperaturaLimitado, 
  criandoLocalETemperatura, deletarLocalETemperatura, deletarRegistroPorIdTemperatura, listarLocaisETemperaturas, 
  listarLocaisExtremos, listarTodosOsRegistros } from "../Models/ClimaModels.js";


export const createLocalETemperatura = async (req, res) => {
    console.log("ClimaControllers :: createLocalETemperatura");
    console.log("Dados recebidos no backend:", req.body)
    const { nome, estado, pais, data, horario, temperatura } = req.body;

    try {
        const [status, resposta] = await criandoLocalETemperatura(
            nome, estado, pais, data, horario, temperatura
        );
        console.log("Resposta a ser enviada:", { mensagem: "Local cadastrado!", pais })
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
    const { nome, estado, pais, data, horario, temperatura } = req.body;

    try {
        const [status, resposta] = await atualizarLocalETemperatura(
            id_locais, nome, estado, pais, data, horario, temperatura
        );

        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar local e temperatura" });
    }
};

export const deleteLocalETemperatura = async (req, res) => {
    console.log("ClimaControllers :: deleteLocalETemperatura");
    const { id } = req.params;

    try {
        const [status, resposta] = await deletarLocalETemperatura(id);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao deletar local e temperatura" });
    }
};

export const getAllRecords = async (req, res) => {
  try {
      const [status, records] = await listarTodosOsRegistros();
      
      // Verifica se existem registros
      if (!records || records.length === 0) {
          return res.status(404).json({ message: "Nenhum registro encontrado" });
      }

      // Verifica se todos os registros têm id_temperatura
      const hasInvalidIds = records.some(record => !record.id_temperatura);
      if (hasInvalidIds) {
          console.error("Alguns registros não possuem id_temperatura:", records);
      }

      return res.status(status).json(records);
  } catch (error) {
      console.error('Erro ao buscar registros:', error);
      return res.status(500).json({ error: 'Erro ao buscar registros' });
  }
};
  
  export const updateRegistroPorIdTemperatura = async (req, res) => {
    console.log("ClimaControllers :: updateRegistroPorIdTemperatura");
  
    const id_temperatura = req.params.id;
    const { locationName, estado, country, date, time, temperature } = req.body;
  
    try {
      const id_Local = await buscarIdLocalPorIdTemperatura(id_temperatura);
  
      if (!id_Local) {
        return res.status(404).json({ mensagem: "Registro não encontrado" });
      }
  
      const [status, result] = await atualizarLocalETemperatura(
        id_Local, locationName, estado, country, date, time, temperature
      );
  
      return res.status(status).json(result);
    } catch (error) {
      console.error("Erro ao atualizar registro:", error);
      return res.status(500).json({ mensagem: "Erro no servidor" });
    }
  };
  
  export const deleteRegistroPorIdTemperatura = async (req, res) => {
    const { id } = req.params;
    console.log("Tentando excluir ID:", id);

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ mensagem: "ID inválido" });
    }

    try {
        const [status, resposta] = await deletarRegistroPorIdTemperatura(Number(id));
        return res.status(status).json(resposta);
    } catch (error) {
        console.error("Erro ao deletar registro:", error);
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }
};

export const listarLocais = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 7;
    const locais = await buscarLocaisComTemperaturaLimitado(limit);
    
    // Garantir que nenhum campo esteja NULL
    const locaisFormatados = locais.map(loc => ({
      ...loc,
      data_formatada: loc.data_formatada || '--/--/----',
      horario_formatado: loc.horario_formatado || '--:--'
    }));
    
    res.json(locaisFormatados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar locais' });
  }
};

export const getExtremeLocations = async (req, res) => {
  try {
    const [status, locations] = await listarLocaisExtremos();
    
    if (!locations || locations.length === 0) {
      return res.status(404).json({ message: "Nenhum registro encontrado" });
    }

    // Separar em quentes e frios
    const result = {
      hot: locations.filter(l => l.tipo === 'quente'),
      cold: locations.filter(l => l.tipo === 'frio')
    };

    return res.status(status).json(result);
  } catch (error) {
    console.error('Erro ao buscar locais extremos:', error);
    return res.status(500).json({ error: 'Erro ao buscar locais extremos' });
  }
};