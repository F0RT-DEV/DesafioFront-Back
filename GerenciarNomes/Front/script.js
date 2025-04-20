// Função para salvar o nome
async function salvarNome() {
  const input = document.getElementById('nomeInput');
  const nome = input.value.trim();
  const mensagemElement = document.getElementById('mensagem');

  if (nome === "") {
    mensagemElement.textContent = "Por favor, digite um nome.";
    mensagemElement.style.background = "rgba(255, 87, 87, 0.2)";
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/pessoa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      mensagemElement.textContent = `Nome "${nome}" salvo com sucesso!`;
      mensagemElement.style.background = "rgba(76, 175, 80, 0.2)";
      carregarNomes();
    } else {
      mensagemElement.textContent = `Erro: ${dados.mensagem}`;
      mensagemElement.style.background = "rgba(255, 87, 87, 0.2)";
    }
  } catch (error) {
    console.error("Erro ao salvar nome:", error);
    mensagemElement.textContent = "Erro ao conectar com o servidor.";
    mensagemElement.style.background = "rgba(255, 87, 87, 0.2)";
  }

  input.value = '';
}

// Função para deletar uma pessoa
async function deletarPessoa(id_pessoa) {
  try {
    const resposta = await fetch(`http://localhost:3000/pessoa/${id_pessoa}`, {
      method: "DELETE"
    });

    const dados = await resposta.json();
    console.log(dados.mensagem);

    if (resposta.ok) {
      carregarNomes(); // Atualiza a lista após deletar
    } else {
      alert(dados.mensagem);
    }
  } catch (erro) {
    console.error("Erro ao deletar pessoa:", erro);
  }
}

let idPessoaEditando = null;

function editarPessoa(id_pessoa, nomeAtual) {
  idPessoaEditando = id_pessoa;
  document.getElementById('novoNomeInput').value = nomeAtual;
  document.getElementById('editarModal').classList.remove('hidden');
}

function fecharModal() {
  document.getElementById('editarModal').classList.add('hidden');
  idPessoaEditando = null;
}

function salvarEdicao() {
  const novoNome = document.getElementById('novoNomeInput').value.trim();

  if (!novoNome) {
    alert("Nome inválido!");
    return;
  }

  fetch(`http://localhost:3000/pessoa/${idPessoaEditando}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome: novoNome })
  })
    .then(res => res.json().then(data => [res.status, data]))
    .then(([status, data]) => {
      if (status === 200) {
        alert("Nome atualizado com sucesso!");
        fecharModal();
        carregarNomes();
      } else {
        alert(data.mensagem || "Erro ao atualizar nome.");
      }
    })
    .catch(erro => {
      console.error("Erro ao atualizar pessoa:", erro);
      alert("Erro de conexão com o servidor.");
    });
}


// Função para carregar nomes
async function carregarNomes() {
  try {
    const resposta = await fetch("http://localhost:3000/pessoa");
    const dados = await resposta.json();

    const namesContainer = document.getElementById('namesList');
    namesContainer.innerHTML = ''; // Limpa a lista atual

    dados.forEach(pessoa => {
      const nameCard = document.createElement('div');
      nameCard.className = 'name-card';
    
      const nomeSpan = document.createElement('span');
      nomeSpan.textContent = pessoa.nome;
    
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = "🗑️";
      btnExcluir.className = 'btn-deletar';
      btnExcluir.onclick = () => deletarPessoa(pessoa.id_pessoa); // Use o ID correto
    
      nameCard.appendChild(nomeSpan);
      nameCard.appendChild(btnExcluir);
      namesContainer.appendChild(nameCard);

      const btnEditar = document.createElement('button');
      btnEditar.textContent = "✏️";
      btnEditar.className = 'btn-editar';
      btnEditar.onclick = () => editarPessoa(pessoa.id_pessoa, pessoa.nome);

      nameCard.appendChild(nomeSpan);
      nameCard.appendChild(btnEditar);
      nameCard.appendChild(btnExcluir);
});
  } catch (error) {
    console.error("Erro ao carregar nomes:", error);
    document.getElementById('namesList').innerHTML = '<p style="color: #fff; text-align: center;">Erro ao carregar nomes.</p>';
  }
}


// Alternar visibilidade da lista de nomes
function toggleNomes() {
  const wrapper = document.getElementById('nomesWrapper');
  const btn = document.querySelector('.ver-btn');

  if (wrapper.classList.contains('hidden')) {
    wrapper.classList.remove('hidden');
    carregarNomes();
    btn.textContent = 'Ocultar nomes';
  } else {
    wrapper.classList.add('hidden');
    btn.textContent = 'Ver nomes';
  }
}

// Tecla Enter no input
document.getElementById('nomeInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    salvarNome();
  }
});

