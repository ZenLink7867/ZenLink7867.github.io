let participantes = getParticipantesFromStorage() || [
    { nome: "Participante 1", pontos: 50 },
    { nome: "Participante 2", pontos: 40 },
    { nome: "Participante 3", pontos: 30 }
];

const usuariosAutorizados = ["1906"];
let usuarioAtual = null;

function verificarPermissao(usuario) {
    return usuariosAutorizados.includes(usuario);
}

function exibirParticipantes() {
    const tableBody = document.querySelector("#rankTable tbody");
    tableBody.innerHTML = "";

    participantes.forEach((participante, index) => {
        const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${participante.nome}</td>
                        <td>${participante.pontos}</td>
                        <td>${verificarPermissao(usuarioAtual) ? `<button onclick="editarNome(${index})">Editar Nome</button> <button onclick="editarPontos(${index})">Editar Pontos</button> <button onclick="excluirParticipante(${index})">Excluir</button>` : ''}</td>
                    </tr>`;
        tableBody.innerHTML += row;
    });

    const adminSection = document.getElementById("adminSection");
    adminSection.style.display = verificarPermissao(usuarioAtual) ? "block" : "none";
}

function adicionarParticipante() {
    const nome = document.querySelector("#participantName").value;
    const pontos = parseInt(document.querySelector("#participantPoints").value);

    if (nome && !isNaN(pontos)) {
        participantes.push({ nome, pontos });
        reorganizarParticipantes();
        limparCampos();
    } else {
        alert("Preencha os campos corretamente.");
    }
}

function editarNome(index) {
    const novoNome = prompt(`Digite o novo nome para ${participantes[index].nome}:`);
    
    if (novoNome !== null && novoNome.trim() !== "") {
        participantes[index].nome = novoNome;
        reorganizarParticipantes();
    } else {
        alert("Digite um nome válido.");
    }
}

function editarPontos(index) {
    const novosPontos = prompt(`Digite os novos pontos para ${participantes[index].nome}:`);
    
    if (novosPontos !== null && !isNaN(novosPontos)) {
        participantes[index].pontos = parseInt(novosPontos);
        reorganizarParticipantes();
    } else {
        alert("Digite um valor válido para os pontos.");
    }
}

function excluirParticipante(index) {
    const confirmacao = confirm(`Tem certeza que deseja excluir ${participantes[index].nome} do rank?`);
    
    if (confirmacao) {
        participantes.splice(index, 1);
        reorganizarParticipantes();
    }
}

function limparCampos() {
    document.querySelector("#participantName").value = "";
    document.querySelector("#participantPoints").value = "";
}

function fazerLogin() {
    usuarioAtual = prompt("Digite seu usuário:");
    
    if (verificarPermissao(usuarioAtual)) {
        document.getElementById("loginSection").style.display = "none";
        exibirParticipantes();
    } else {
        alert("Usuário não autorizado.");
    }
}

function salvarParticipantesNoStorage() {
    localStorage.setItem("participantes", JSON.stringify(participantes));
}

function getParticipantesFromStorage() {
    const participantesString = localStorage.getItem("participantes");
    return participantesString ? JSON.parse(participantesString) : null;
}

function reorganizarParticipantes() {
    participantes.sort((a, b) => b.pontos - a.pontos);
    exibirParticipantes();
    salvarParticipantesNoStorage();
}

// Inicializa o site exibindo os participantes
exibirParticipantes();
