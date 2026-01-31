// Funções compartilhadas de registro no dashboard
function registrarNoDashboard(acao, nome, turma, motivo) {
    const registro = {
        data: new Date().toLocaleDateString('pt-BR'),
        acao: acao,
        nome: nome,
        turma: turma,
        motivo: motivo
    };
    
    // Salvar no localStorage do dashboard
    let dashboardData = JSON.parse(localStorage.getItem('dashboard_registros')) || [];
    dashboardData.unshift(registro);
    localStorage.setItem('dashboard_registros', JSON.stringify(dashboardData));
    
    // Atualizar contador total de alunos
    atualizarContadorAlunos();
}

function atualizarContadorAlunos() {
    let total = 0;
    const turmas = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B'];
    
    turmas.forEach(turma => {
        const dados = JSON.parse(localStorage.getItem(`nomes${turma}`));
        if (dados && dados.nomet) {
            total += dados.nomet.length;
        }
    });
    
    localStorage.setItem('total_alunos', total);
}

// script6A.js
const nomes6A = {
    nomet: [
        "Lucas da Silva Santos", "Ana Carolina Oliveira Lima", "Gabriel Pereira Costa",
        "Isabela Santos Rodrigues", "Felipe Martins Almeida", "Mariana Oliveira Souza",
        "Rafael Silva Gomes", "Juliana Costa Pereira", "Leonardo Almeida Rodrigues",
        "Carolina Fernandes Silva", "Pedro Oliveira Santos", "Camila Lima Castro",
        "Matheus Santos Costa", "Larissa Almeida Rodrigues", "Thiago Martins Oliveira",
        "Marina Costa Lima", "João Silva Pereira", "Amanda Santos Almeida",
        "Bruno Oliveira Costa", "Fernanda Lima Santos", "Gustavo Costa Almeida",
        "Luiza Silva Rodrigues", "Daniel Martins Lima", "Renata Oliveira Costa",
        "Eduardo Santos Pereira"
    ],
    nota1t: [],
    nota2t: [],
    nota3t: []
};

function memorizaNomesEmPartes() {
    localStorage.setItem('nomes6A', JSON.stringify(nomes6A));
}

if (!localStorage.getItem('nomes6A')) {
    memorizaNomesEmPartes();
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('nomes6A')) ?? { nomet: [], nota1t: [], nota2t: [], nota3t: [] };
}

function setLocalStorage(nomes6A) {
    localStorage.setItem('nomes6A', JSON.stringify(nomes6A));
}

function ordenarNomesComNotas(nomes6A) {
    const combinados = nomes6A.nomet.map((nome, index) => ({
        nome: nome,
        nota1: nomes6A.nota1t[index],
        nota2: nomes6A.nota2t[index],
        nota3: nomes6A.nota3t[index]
    }));
    combinados.sort((a, b) => a.nome.localeCompare(b.nome));
    nomes6A.nomet = combinados.map(item => item.nome);
    nomes6A.nota1t = combinados.map(item => item.nota1);
    nomes6A.nota2t = combinados.map(item => item.nota2);
    nomes6A.nota3t = combinados.map(item => item.nota3);
}

let nomesArmazenados = getLocalStorage();
ordenarNomesComNotas(nomesArmazenados);
setLocalStorage(nomesArmazenados);

const corpotabela = document.getElementById("tabelaCorpo");
const formulario = document.querySelector('#form');
const nome = document.querySelector('#txtNome');
const nota1 = document.querySelector('#txtnota1');
const nota2 = document.querySelector('#txtnota2');
const nota3 = document.querySelector('#txtnota3');
const botao = document.querySelector('#btnsalvar');
const add = document.querySelector('#add');
let editaId = null;

function atualizarTabela() {
    corpotabela.innerHTML = "";
    const nomes6A = getLocalStorage();
    nomes6A.nomet.forEach((nome, index) => {
        inserirLinhaTabela(nome, index, nomes6A.nota1t[index], nomes6A.nota2t[index], nomes6A.nota3t[index]);
    });
}

function inserirLinhaTabela(nome, index, nota1 = '', nota2 = '', nota3 = '') {
    const novaLinha = document.createElement('tr');
    const media = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3;
    const mediaValida = isNaN(media) ? '' : media.toFixed(2);
    if (nota1 == null && nota2 == null && nota3 == null) { nota1 = 0; nota2 = 0; nota3 = 0; }
    
    novaLinha.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td><div class="d-flex justify-content-center align-items-center col-sm-12 col-md-12"><object data="../IMG/img/icone_perfil.svg" type="image/svg+xml" width="120%" height="auto" class="align-center"></object></div></td>
        <td id="nome${index + 1}">${nome}</td>
        <td>${nota1}</td>
        <td>${nota2}</td>
        <td>${nota3}</td>
        <td>${mediaValida}</td>
        <td>
            <button type="button" class="botao_coiso col-12 col-md-10 col-lg-5 btn btn-warning" id="${index}" onclick="preparaEditacao(${index})"> Editar </button>
            <button type="button" class="botao_coiso col-12 col-md-10 col-lg-5 btn btn-danger" id="${index}" onclick="excluirNota(${index})"> Excluir </button>
        </td>`;
    corpotabela.appendChild(novaLinha);
}

function inserirNota() {
    const aluno = { nome: document.getElementById('txtNome').value, nota1: document.getElementById('txtnota1').value, nota2: document.getElementById('txtnota2').value, nota3: document.getElementById('txtnota3').value };
    if (parseFloat(aluno.nota1) <= 10 && parseFloat(aluno.nota2) <= 10 && parseFloat(aluno.nota3) <= 10) {
        if (parseFloat(aluno.nota1) >= 0 && parseFloat(aluno.nota2) >= 0 && parseFloat(aluno.nota3) >= 0) {
            let nomes6A = getLocalStorage();
            if (editaId === null) {
                nomes6A.nomet.push(aluno.nome);
                nomes6A.nota1t.push(aluno.nota1);
                nomes6A.nota2t.push(aluno.nota2);
                nomes6A.nota3t.push(aluno.nota3);
                ordenarNomesComNotas(nomes6A);
                setLocalStorage(nomes6A);
                registrarNoDashboard('adicionado', aluno.nome, '6º Ano - A', 'Novo aluno matriculado');
                alert("Aluno adicionado com sucesso!");
                atualizarTabela();
                add.style.display = 'block';
                formulario.style.display = 'none';
            } else {
                editarNota(nomes6A, editaId, aluno);
            }
        } else { alert('Coloque uma nota entre 0 e 10'); }
    } else { alert('Coloque uma nota entre 0 e 10'); }
}

function editarNota(nomes6A, index, aluno) {
    nomes6A.nomet[index] = aluno.nome;
    nomes6A.nota1t[index] = aluno.nota1;
    nomes6A.nota2t[index] = aluno.nota2;
    nomes6A.nota3t[index] = aluno.nota3;
    ordenarNomesComNotas(nomes6A);
    setLocalStorage(nomes6A);
    botao.value = "Inserir";
    editaId = null;
    formulario.style.display = 'none';
    atualizarTabela();
    add.style.display = 'block';
    alert(`A atualização dos dados do aluno foi realizada com sucesso`);
}

function excluirNota(index) {
    let nomes6A = getLocalStorage();
    const nome = nomes6A.nomet[index];
    const motivo = prompt(`Qual o motivo da exclusão do aluno ${nome}? (O aluno saiu da escola, o aluno mudou de turma)`);
    if (motivo) {
        const confirmarExclusao = confirm(`Deseja realmente excluir o aluno ${nome} da chamada?\nMotivo: ${motivo}`);
        if (confirmarExclusao) {
            const senha = prompt(`Digite a senha para excluir`);
            if (senha === '12345') {
                alert(`O aluno ${nome} foi excluído da chamada.`);
                nomes6A.nomet.splice(index, 1);
                nomes6A.nota1t.splice(index, 1);
                nomes6A.nota2t.splice(index, 1);
                nomes6A.nota3t.splice(index, 1);
                setLocalStorage(nomes6A);
                atualizarTabela();
                registrarNoDashboard('excluido', nome, '6º Ano - A', motivo);
            } else { alert('A senha está errada!'); }
        }
    }
}

function preparaEditacao(index) {
    let nomes6A = getLocalStorage();
    editaId = index;
    const nome1 = nomes6A.nomet[index];
    const confirmar = confirm(`Deseja realmente editar os valores do aluno ${nome1} ?`);
    if (confirmar) {
        const senhae = prompt(`Digite a senha para editar`);
        if (senhae === '12345') {
            formulario.style.display = 'block';
            nome.value = nome1;
            nota1.value = nomes6A.nota1t[index];
            nota2.value = nomes6A.nota2t[index];
            nota3.value = nomes6A.nota3t[index];
            botao.value = "Atualizar";
        } else { alert('A senha está errada!'); }
    }
}

const adicionar = () => {
    if (getLocalStorage().nomet.length < 25) {
        const senhaa = prompt(`Digite a senha para adicionar um novo aluno`);
        if (senhaa === '12345') { add.style.display = 'none'; formulario.style.display = 'block'; }
        else { alert('A senha está errada!'); }
    } else { alert('A tabela só pode ter 25 alunos'); }
}

function sla() {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) { form.classList.add('was-validated'); }
            else { inserirNota(); form.classList.remove('was-validated'); form.reset(); }
            event.preventDefault(); event.stopPropagation();
            form.classList.add('was-validated');
        }, false);
    });
}

document.addEventListener('DOMContentLoaded', () => { atualizarTabela(); sla(); });
