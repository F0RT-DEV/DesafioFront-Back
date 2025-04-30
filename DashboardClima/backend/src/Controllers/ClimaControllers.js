import { buscarDadosClima } from "../Models/ClimaModels.js";

// controllers/ClimaController.js
export const getClima = async (req, res) => {
    console.log("ClimaControllers :: getClima");
    const { id_local } = req.params;
    
    try {
        // Chamada para o model (similar ao Cadastrarlocais)
        const [status, resposta] = await buscarDadosClima(id_local);
        return res.status(status).json(resposta);
        
    } catch (error) {
        console.error("Erro no controller getClima:", error);
        return res.status(500).json({ 
            mensagem: "Erro interno ao processar requisição",
            ...(process.env.NODE_ENV === 'development' && {
                detalhes: error.message
            })
        });
    }
}

// No seu ClimaModels.js, adicione:
export const inicializarDados = async () => {
    const locaisIniciais = [
        {
            nome: "São Paulo",
            estado: "SP",
            pais: "Brasil",
            data: new Date().toISOString(),
            hora: "14:30",
            temperatura: 25
        }
    ];

    for (const local of locaisIniciais) {
        await Cadastrarlocais(...Object.values(local));
    }
};

// Chame esta função uma vez quando o servidor iniciar