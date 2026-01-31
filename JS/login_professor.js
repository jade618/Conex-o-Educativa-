professores = {
    email: ['professor@gmail.com', 'joao123@gmail.com', 'jeffersonvianna@gmail.com'],
    senha: ['123456', '123', 'jefferson123']
}

function validar() {
    const in_email = document.querySelector('#inputEmail').value.trim()
    const in_senha = document.querySelector('#inputPassword').value
    
    let autenticado = false
    
    // Verificar cada par de email/senha
    for (let i = 0; i < professores.email.length; i++) {
        if (in_email === professores.email[i] && in_senha === professores.senha[i]) {
            autenticado = true
            break
        }
    }
    
    if (autenticado) {
        // Redireciona para a página professor.html
        window.location.href = "professor.html"
    } else {
        alert('Seu email ou senha estão errados. Tente novamente.')
    }
}

function aparecer() {
    let inputPass = document.getElementById('inputPassword')
    let btn = document.getElementById('btn-senha')

    if (inputPass.type === 'password') {
        inputPass.setAttribute('type', 'text')
        btn.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
    } else {
        inputPass.setAttribute('type', 'password')
        btn.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
    }
}
