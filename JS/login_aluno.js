
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

function validar() {
    const in_email = document.querySelector('#inputEmail').value.trim().toLowerCase()
    const in_senha = document.querySelector('#inputPassword').value
    
    // Buscar aluno pelo email
    const alunos = getAlunos()
    const alunoEncontrado = alunos.find(aluno => aluno.email.toLowerCase() === in_email)
    
    if (alunoEncontrado) {
        // Verificar senha
        if (in_senha === alunoEncontrado.senha) {
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
