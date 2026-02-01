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
