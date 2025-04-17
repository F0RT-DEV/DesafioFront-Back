import { criarPessoa, deletarPessoa, listarPessoas } from "../models/pessoaModel.js";


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
    return res.status(500).json({ mensagem: "Erro no servidor" });
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

export const atualizarPessoa = async (req, res) => {
    console.log("PessoaController :: atualizarPessoa");
    const { id } = req.params;
    const { nome } = req.body;
  
    if (!nome) {
      return res.status(400).json({ mensagem: "Nome é obrigatório." });
    }
  
    try {
      const [status, resposta] = await atualizarPessoa(id, nome);
      return res.status(status).json(resposta);
    } catch (error) {
      console.error("Erro no controller:", error);
      return res.status(500).json({ mensagem: "Erro no servidor" });
    }
  };  