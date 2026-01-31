// script9B.js
const nomes9B = {
    nomet: [
        "AmandaSilvaCosta", "BrunoLimaAlmeida", "CarlaSantosOliveira",
        "DanielCostaPereira", "ElaineAlmeidaLima", "FabioOliveiraSantos",
        "GiovanaPereiraCosta", "HenriqueLimaAlmeida", "IsabelaSantosPereira",
        "JorgeCostaOliveira", "KarlaAlmeidaLima", "LeonardoPereiraSantos",
        "MarinaCostaOliveira", "NicolasLimaAlmeida", "OliviaSantosCosta",
        "PedroPereiraOliveira", "QueciaAlmeidaLima", "RafaelCostaSantos",
        "SabrinaOliveiraPereira", "ThiagoAlmeidaCosta", "UrsulaLimaSantos",
        "VictorOliveiraAlmeida", "WanessaPereiraCosta", "XavierLimaOliveira",
        "YaraAlmeidaSantos"
    ],
    nota1t: [], nota2t: [], nota3t: []
};

function registrarNoDashboard(acao, nome, turma, motivo) {
    const registro = { data: new Date().toLocaleDateString('pt-BR'), acao: acao, nome: nome, turma: turma, motivo: motivo };
    let dashboardData = JSON.parse(localStorage.getItem('dashboard_registros')) || [];
    dashboardData.unshift(registro);
    localStorage.setItem('dashboard_registros', JSON.stringify(dashboardData));
}

function atualizarContadorAlunos() {
    let total = 0;
    const turmas = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B'];
    turmas.forEach(turma => {
        const dados = JSON.parse(localStorage.getItem(`nomes${turma}`));
        if (dados && dados.nomet) total += dados.nomet.length;
    });
    localStorage.setItem('total_alunos', total);
}

function memorizaNomesEmPartes() { localStorage.setItem('nomes9B', JSON.stringify(nomes9B)); }
if (!localStorage.getItem('nomes9B')) { memorizaNomesEmPartes(); }

function getLocalStorage() { return JSON.parse(localStorage.getItem('nomes9B')) ?? { nomet: [], nota1t: [], nota2t: [], nota3t: [] }; }
function setLocalStorage(nomes9B) { localStorage.setItem('nomes9B', JSON.stringify(nomes9B)); }

function ordenarNomesComNotas(nomes9B) {
    const combinados = nomes9B.nomet.map((nome, index) => ({ nome: nome, nota1: nomes9B.nota1t[index], nota2: nomes9B.nota2t[index], nota3: nomes9B.nota3t[index] }));
    combinados.sort((a, b) => a.nome.localeCompare(b.nome));
    nomes9B.nomet = combinados.map(item => item.nome);
    nomes9B.nota1t = combinados.map(item => item.nota1);
    nomes9B.nota2t = combinados.map(item => item.nota2);
    nomes9B.nota3t = combinados.map(item => item.nota3);
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
    const nomes9B = getLocalStorage();
    nomes9B.nomet.forEach((nome, index) => { inserirLinhaTabela(nome, index, nomes9B.nota1t[index], nomes9B.nota2t[index], nomes9B.nota3t[index]); });
}

function inserirLinhaTabela(nome, index, nota1 = '', nota2 = '', nota3 = '') {
    const novaLinha = document.createElement('tr');
    const media = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3;
    const mediaValida = isNaN(media) ? '' : media.toFixed(2);
    if (nota1 == null && nota2 == null && nota3 == null) { nota1 = 0; nota2 = 0; nota3 = 0; }
    novaLinha.innerHTML = `<th scope="row">${index + 1}</th><td><div class="d-flex justify-content-center align-items-center col-sm-12 col-md-12"><object data="../IMG/img/icone_perfil.svg" type="image/svg+xml" width="120%" height="auto" class="align-center"></object></div></td><td id="nome${index + 1}">${nome}</td><td>${nota1}</td><td>${nota2}</td><td>${nota3}</td><td>${mediaValida}</td><td><button type="button" class="botao_coiso col-12 col-md-10 col-lg-5 btn btn-warning" id="${index}" onclick="preparaEditacao(${index})"> Editar </button><button type="button" class="botao_coiso col-12 col-md-10 col-lg-5 btn btn-danger" id="${index}" onclick="excluirNota(${index})"> Excluir </button></td>`;
    corpotabela.appendChild(novaLinha);
}

function inserirNota() {
    const aluno = { nome: document.getElementById('txtNome').value, nota1: document.getElementById('txtnota1').value, nota2: document.getElementById('txtnota2').value, nota3: document.getElementById('txtnota3').value };
    if (parseFloat(aluno.nota1) <= 10 && parseFloat(aluno.nota2) <= 10 && parseFloat(aluno.nota3) <= 10) {
        if (parseFloat(aluno.nota1) >= 0 && parseFloat(aluno.nota2) >= 0 && parseFloat(aluno.nota3) >= 0) {
            let nomes9B = getLocalStorage();
            if (editaId === null) {
                nomes9B.nomet.push(aluno.nome);
                nomes9B.nota1t.push(aluno.nota1);
                nomes9B.nota2t.push(aluno.nota2);
                nomes9B.nota3t.push(aluno.nota3);
                ordenarNomesComNotas(nomes9B);
                setLocalStorage(nomes9B);
                registrarNoDashboard('adicionado', aluno.nome, '9º Ano - B', 'Novo aluno matriculado');
                alert("Aluno adicionado com sucesso!");
                atualizarTabela();
                add.style.display = 'block';
                formulario.style.display = 'none';
            } else { editarNota(nomes9B, editaId, aluno); }
        } else { alert('Coloque uma nota entre 0 e 10'); }
    } else { alert('Coloque uma nota entre 0 e 10'); }
}

function editarNota(nomes9B, index, aluno) {
    nomes9B.nomet[index] = aluno.nome;
    nomes9B.nota1t[index] = aluno.nota1;
    nomes9B.nota2t[index] = aluno.nota2;
    nomes9B.nota3t[index] = aluno.nota3;
    ordenarNomesComNotas(nomes9B);
    setLocalStorage(nomes9B);
    botao.value = "Inserir";
    editaId = null;
    formulario.style.display = 'none';
    atualizarTabela();
    add.style.display = 'block';
    alert(`A atualização dos dados do aluno foi realizada com sucesso`);
}

function excluirNota(index) {
    let nomes9B = getLocalStorage();
    const nome = nomes9B.nomet[index];
    const motivo = prompt(`Qual o motivo da exclusão do aluno ${nome}? (O aluno saiu da escola, o aluno mudou de turma)`);
    if (motivo) {
        const confirmarExclusao = confirm(`Deseja realmente excluir o aluno ${nome} da chamada?\nMotivo: ${motivo}`);
        if (confirmarExclusao) {
            const senha = prompt(`Digite a senha para excluir`);
            if (senha === '12345') {
                alert(`O aluno ${nome} foi excluído da chamada.`);
                nomes9B.nomet.splice(index, 1);
                nomes9B.nota1t.splice(index, 1);
                nomes9B.nota2t.splice(index, 1);
                nomes9B.nota3t.splice(index, 1);
                setLocalStorage(nomes9B);
                atualizarTabela();
                registrarNoDashboard('excluido', nome, '9º Ano - B', motivo);
            } else { alert('A senha está errada!'); }
        }
    }
}

function preparaEditacao(index) {
    let nomes9B = getLocalStorage();
    editaId = index;
    const nome1 = nomes9B.nomet[index];
    const confirmar = confirm(`Deseja realmente editar os valores do aluno ${nome1} ?`);
    if (confirmar) {
        const senhae = prompt(`Digite a senha para editar`);
        if (senhae === '12345') {
            formulario.style.display = 'block';
            nome.value = nome1;
            nota1.value = nomes9B.nota1t[index];
            nota2.value = nomes9B.nota2t[index];
            nota3.value = nomes9B.nota3t[index];
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
