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

// // Function to save a name
// async function salvarNome() {
//   const input = document.getElementById('nomeInput');
//   const nome = input.value.trim();
//   const mensagemElement = document.getElementById('mensagem');

//   if (nome === "") {
//     mensagemElement.textContent = "Por favor, digite um nome.";
//     mensagemElement.style.background = "rgba(255, 87, 87, 0.2)";
//     return;
//   }

//   try {
//     const resposta = await fetch("http://localhost:3000/pessoa", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ nome })
//     });

//     const dados = await resposta.json();

//     if (resposta.ok) {
//       mensagemElement.textContent = `Nome "${nome}" salvo com sucesso!`;
//       mensagemElement.style.background = "rgba(76, 175, 80, 0.2)";
//       carregarNomes(); // Refresh the names list
//     } else {
//       mensagemElement.textContent = `Erro: ${dados.mensagem}`;
//       mensagemElement.style.background = "rgba(255, 87, 87, 0.2)";
//     }
//   } catch (error) {
//     console.error("Erro ao salvar nome:", error);
//     mensagemElement.textContent = "Erro ao conectar com o servidor.";
//     mensagemElement.style.background = "rgba(255, 87, 87, 0.2)";
//   }

//   input.value = '';
// }

// // Function to load saved names
// async function carregarNomes() {
//   try {
//     const resposta = await fetch("http://localhost:3000/pessoas");
//     const dados = await resposta.json();
    
//     const namesContainer = document.getElementById('namesList');
//     namesContainer.innerHTML = ''; // Clear current list

//     dados.forEach(pessoa => {
//       const nameCard = document.createElement('div');
//       nameCard.className = 'name-card';
//       nameCard.textContent = pessoa.nome;
//       namesContainer.appendChild(nameCard);
//     });
//   } catch (error) {
//     console.error("Erro ao carregar nomes:", error);
//     document.getElementById('namesList').innerHTML = '<p style="color: #fff; text-align: center;">Erro ao carregar nomes.</p>';
//   }
// }

// // Function to toggle visibility of names list
// function toggleNomes() {
//   const wrapper = document.getElementById('nomesWrapper');

//   if (wrapper.classList.contains('hidden')) {
//     wrapper.classList.remove('hidden');
//     carregarNomes();
//   } else {
//     wrapper.classList.add('hidden');
//   }
// }

// // Add keyboard support for form submission
// document.getElementById('nomeInput').addEventListener('keypress', function(e) {
//   if (e.key === 'Enter') {
//     salvarNome();
//   }
// });
