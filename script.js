const apiUrl = "https://lrcar-gtfsdhe4ekbfc0hg.brazilsouth-01.azurewebsites.net/LRcar";

// Função para buscar todos os carros e atualizar a tabela
async function buscarCarros() {
  try {
    const resposta = await fetch(apiUrl);
    if (resposta.ok) {
      const carros = await resposta.json();
      atualizarTabela(carros);
    } else {
      alert("Falha ao buscar carros.");
    }
  } catch (erro) {
    console.error("Erro ao buscar carros:", erro);
  }
}

// Função para atualizar a tabela com os dados dos carros
function atualizarTabela(carros) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; // Limpa as linhas existentes da tabela
  carros.forEach(carro => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${carro.id}</td>
      <td>${carro.nome}</td>
      <td>${carro.email}</td>
      <td>${carro.cpf}</td>
      <td>${carro.telefone}</td>
      <td><button onclick="deletarCarro('${carro.id}')">Deletar</button></td>
      <td><button onclick="abrirFormularioAtualizar('${carro.id}', '${carro.nome}', '${carro.email}', '${carro.cpf}', '${carro.telefone}')">Atualizar</button></td>
    `;
    tbody.appendChild(linha);
  });
}

// Criar um novo carro
document.querySelector(".register-button").addEventListener("click", async () => {
  const nome = prompt("Digite o nome do carro:");
  const email = prompt("Digite o email do carro:");
  const cpf = prompt("Digite o CPF do carro:");
  const telefone = prompt("Digite o telefone do carro:");

  const novoCarro = { nome, email, cpf, telefone };

  try {
    const resposta = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoCarro),
    });

    if (resposta.ok) {
      alert("Carro adicionado com sucesso!");
      buscarCarros(); // Atualiza a tabela
    } else {
      alert("Falha ao adicionar carro.");
    }
  } catch (erro) {
    console.error("Erro ao adicionar carro:", erro);
  }
});

// Deletar um carro
async function deletarCarro(id) {
  try {
    const resposta = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      alert("Carro deletado com sucesso!");
      buscarCarros(); // Atualiza a tabela
    } else {
      alert("Falha ao deletar carro.");
    }
  } catch (erro) {
    console.error("Erro ao deletar carro:", erro);
  }
}

// Abrir o formulário para atualização e atualizar o carro
function abrirFormularioAtualizar(id, nome, email, cpf, telefone) {
  const novoNome = prompt("Digite o novo nome do carro:", nome);
  const novoEmail = prompt("Digite o novo email do carro:", email);
  const novoCpf = prompt("Digite o novo CPF do carro:", cpf);
  const novoTelefone = prompt("Digite o novo telefone do carro:", telefone);

  const carroAtualizado = { nome: novoNome, email: novoEmail, cpf: novoCpf, telefone: novoTelefone };

  atualizarCarro(id, carroAtualizado);
}

// Atualizar um carro
async function atualizarCarro(id, carroAtualizado) {
  try {
    const resposta = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carroAtualizado),
    });

    if (resposta.ok) {
      alert("Carro atualizado com sucesso!");
      buscarCarros(); // Atualiza a tabela
    } else {
      alert("Falha ao atualizar carro.");
    }
  } catch (erro) {
    console.error("Erro ao atualizar carro:", erro);
  }
}

// Buscar todos os carros assim que a página for carregada
window.onload = buscarCarros;
