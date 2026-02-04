// Dados dos alunos (buscados do localStorage)
function getAlunos() {
    // Primeiro verifica se há alunos cadastrados
    const cadastrados = JSON.parse(localStorage.getItem('alunosCadastrados')) || [];
    
    // Se não houver cadastrados, usa os padrões
    if (cadastrados.length === 0) {
        return [
            { email: 'aluno@gmail.com', senha: '12345', nome: 'João Silva', turma: '6A' },
            { email: 'aluno2@gmail.com', senha: '12345', nome: 'Maria Santos', turma: '7A' },
            { email: 'aluno3@gmail.com', senha: '12345', nome: 'Pedro Oliveira', turma: '8A' }
        ];
    }
    
    return cadastrados;
}

// ========== FUNÇÃO DE SINCRONIZAÇÃO ==========
// Sincroniza alunos da lista da turma para a lista de login
function syncAlunosDaTurmaParaCadastrados(turma) {
    const dadosTurma = JSON.parse(localStorage.getItem('nomes' + turma));
    const cadastrados = JSON.parse(localStorage.getItem('alunosCadastrados')) || [];
    
    if (dadosTurma && dadosTurma.nomet) {
        dadosTurma.nomet.forEach((nome, index) => {
            // Verificar se o aluno já existe na lista de cadastrados
            const jaExiste = cadastrados.some(a => 
                a.nome.toLowerCase() === nome.toLowerCase() && a.turma === turma
            );
            
            // Se não existir, adicionar com senha padrão
            if (!jaExiste) {
                // Criar email automaticamente baseado no nome
                const emailAuto = nome.toLowerCase().replace(/\s+/g, '.') + '@aluno.com';
                
                cadastrados.push({
                    email: emailAuto,
                    senha: '12345', // Senha padrão
                    nome: nome,
                    turma: turma,
                    sync: true // Marcar como sincronizado automaticamente
                });
            }
        });
        
        // Salvar lista atualizada
        localStorage.setItem('alunosCadastrados', JSON.stringify(cadastrados));
        console.log(`Sincronização concluída para ${turma}: ${cadastrados.length} alunos`);
    }
}

// ========== FUNÇÃO PARA SINCRONIZAR TODAS AS TURMAS ==========
function sincronizarTodasAsTurmas() {
    const turmas = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B'];
    turmas.forEach(turma => {
        syncAlunosDaTurmaParaCadastrados(turma);
    });
}

// ========== BUSCAR ALUNO PELO EMAIL COM FALLBACK ==========
function buscarAlunoPorEmail(email) {
    const alunos = getAlunos();
    
    // Tentar encontrar pelo email
    let alunoEncontrado = alunos.find(aluno => 
        aluno.email.toLowerCase() === email.toLowerCase()
    );
    
    // Se não encontrou pelo email, tentar encontrar pelo nome no email
    if (!alunoEncontrado) {
        // Tentar buscar em todas as turmas pelo nome
        const turmas = ['6A', '6B', '7A', '7B', '8A', '8B', '9A', '9B'];
        
        for (const turma of turmas) {
            const dadosTurma = JSON.parse(localStorage.getItem('nomes' + turma));
            if (dadosTurma && dadosTurma.nomet) {
                for (let i = 0; i < dadosTurma.nomet.length; i++) {
                    const nome = dadosTurma.nomet[i];
                    const nomeNormalizado = nome.toLowerCase().replace(/\s+/g, '.');
                    
                    // Verificar se o email contém parte do nome
                    if (email.toLowerCase().includes(nomeNormalizado)) {
                        // Criar objeto do aluno encontrado
                        return {
                            email: email,
                            senha: '12345',
                            nome: nome,
                            turma: turma
                        };
                    }
                }
            }
        }
    }
    
    return alunoEncontrado;
}

function validar() {
    const in_email = document.querySelector('#inputEmail').value.trim().toLowerCase()
    const in_senha = document.querySelector('#inputPassword').value
    
    // Sincronizar todas as turmas antes de buscar
    sincronizarTodasAsTurmas();
    
    // Buscar aluno pelo email com fallback
    let alunoEncontrado = buscarAlunoPorEmail(in_email);
    
    if (alunoEncontrado) {
        // Verificar senha (tentar tanto a cadastrada quanto a padrão)
        if (in_senha === alunoEncontrado.senha || in_senha === '12345') {
            // Salvar dados do aluno no localStorage
            localStorage.setItem('nomeAluno', alunoEncontrado.nome)
            localStorage.setItem('turmaAluno', alunoEncontrado.turma)
            localStorage.setItem('emailAluno', alunoEncontrado.email)
            
            // Redirecionar para página do aluno
            window.location.href = 'perfilaluno.html'
        } else {
            alert('Senha incorreta. Tente novamente.')
        }
    } else {
        alert('Email não encontrado. Verifique se seu cadastro foi realizado pelo administrador.')
    }
}

function aparecer() {
    let inputPass = document.getElementById('inputPassword')
    let btn = document.getElementById('btn-senha')

    if(inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text')
        btn.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
    }
    else {
        inputPass.setAttribute('type', 'password')
        btn.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
    }
}

// Função para destacar dia da semana
function highlightDay(day) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    days.forEach(d => {
        const elements = document.querySelectorAll(`.${d}`);
        elements.forEach(el => {
            if (d === day) {
                el.classList.add('highlight');
            } else {
                el.classList.remove('highlight');
            }
        });
    });
}

// ========== SISTEMA DE MATERIAIS ==========

// Mapeamento de turmas para padronização
const mapeamentoTurmas = {
    '6º Ano A': '6A', '6º Ano B': '6B',
    '7º Ano A': '7A', '7º Ano B': '7B',
    '8º Ano A': '8A', '8º Ano B': '8B',
    '9º Ano A': '9A', '9º Ano B': '9B'
};

// Salvar material no localStorage
function salvarMaterial(event) {
    event.preventDefault();
    
    const turmaSelecionada = document.getElementById('turma').value;
    const turmaPadronizada = mapeamentoTurmas[turmaSelecionada] || turmaSelecionada;
    
    const material = {
        id: Date.now(),
        materia: document.getElementById('materia').value,
        turma: turmaSelecionada,       // Salva como está no select (para exibição)
        turmaPadrao: turmaPadronizada, // Salva padronizado (6A, 6B, etc.) para busca
        titulo: document.getElementById('tituloMaterial').value,
        descricao: document.getElementById('descricaoMaterial').value,
        link: document.getElementById('linkMaterial').value,
        data: document.getElementById('dataMaterial').value,
        dataCadastro: new Date().toLocaleDateString('pt-BR')
    };
    
    // Salvar no localStorage (chave que o aluno também usa)
    let materiais = JSON.parse(localStorage.getItem('materiaisProfessor')) || [];
    materiais.unshift(material);
    localStorage.setItem('materiaisProfessor', JSON.stringify(materiais));
    
    // Limpar formulário
    document.getElementById('materialForm').reset();
    
    // Atualizar lista
    carregarMateriais();
    
    alert('Material salvo com sucesso! Os alunos poderão visualizar em seus perfis.');
}

// Carregar materiais do localStorage
function carregarMateriais() {
    const container = document.getElementById('listaMateriais');
    let materiais = JSON.parse(localStorage.getItem('materiaisProfessor')) || [];
    
    container.innerHTML = '';
    
    if (materiais.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-inbox" style="font-size: 3rem; color: #adb5bd;"></i>
                <p class="mt-3 text-muted">Nenhum material cadastrado ainda.</p>
            </div>
        `;
        return;
    }
    
    materiais.forEach(material => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="material-item">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge bg-primary">${material.materia}</span>
                    <span class="badge bg-secondary">${material.turma}</span>
                </div>
                <h5><i class="bi bi-file-earmark-text"></i> ${material.titulo}</h5>
                <p>${material.descricao || 'Sem descrição'}</p>
                <div class="meta mb-2">
                    <i class="bi bi-calendar3"></i> ${material.dataCadastro} | 
                    <i class="bi bi-calendar-event"></i> ${formatarData(material.data)}
                </div>
                <div class="actions">
                    ${material.link ? `<a href="${material.link}" target="_blank" class="btn btn-primary btn-sm" style="background-color: #021373; border: none;"><i class="bi bi-link-45deg"></i> Acessar</a>` : ''}
                    <button class="btn btn-danger btn-sm" onclick="excluirMaterial(${material.id})"><i class="bi bi-trash"></i> Excluir</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Excluir material
function excluirMaterial(id) {
    if (confirm('Tem certeza que deseja excluir este material?')) {
        let materiais = JSON.parse(localStorage.getItem('materiaisProfessor')) || [];
        materiais = materiais.filter(m => m.id !== id);
        localStorage.setItem('materiaisProfessor', JSON.stringify(materiais));
        carregarMateriais();
        alert('Material excluído com sucesso!');
    }
}

// Formatar data
function formatarData(data) {
    if (!data) return '';
    const parts = data.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    // Definir data atual no formulário
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dataMaterial').value = today;
    
    // Carregar materiais
    carregarMateriais();
});

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

