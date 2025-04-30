import { atualiazarPessoa, criarPessoa, deletarPessoa, listarPessoas } from "../models/PessoaModel.js";


export const salvarPessoa = async (req, res) => {
  console.log("PessoaController :: salvarPessoa");
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ mensagem: "Nome é obrigatório." });
  }

  try {
    const [status, resposta] = await criarPessoa(nome);
    return res.status(status).json(resposta);
  } catch (error) {
    console.error("Erro no controller:", error);
    return res.status(500).json({ mensagem: "Erro non servidor" });
  }
};

export const obterPessoas = async (req, res) => {
    console.log("PessoaController :: obterPessoas");
    try {
      const [status, resposta] = await listarPessoas();
      return res.status(status).json(resposta);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ mensagem: "Erro no servidor" });
    }
}

export const removerPessoa = async (req, res) => {
    console.log("PessoaController :: removerPessoa");
    const { id_pessoa } = req.params;
    try {
      const [status, resposta] = await deletarPessoa(id_pessoa);
      return res.status(status).json(resposta);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ mensagem: "Erro no servidor" });
    }
};

export const atualizarUmaPessoa = async (req, res) => {
    console.log("PessoaController :: atualizarPessoa");
    const { nome } = req.body;
    const { id_pessoa } = req.params;
    
  
    if (!nome) {
      return res.status(400).json({ mensagem: "Nome é obrigatório." });
    }
  
    try {
      const [status, resposta] = await atualiazarPessoa(nome, id_pessoa);
      return res.status(status).json(resposta);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ mensagem: "Erro no servidor" });
    }
  }