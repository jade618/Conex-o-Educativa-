
adm = {email:'adm@gmail.com', senha:'12345'}

function validar() {
    // Obtém os valores digitados pelo usuário
    const in_email = document.querySelector('#inputEmail').value.trim()
    const in_senha = document.querySelector('#inputPassword').value

    // Compara email e senha diretamente
    if (in_email === adm.email && in_senha === adm.senha) {
        // Redireciona para a página alunos6A.html
        window.location.href = "alunos6A.html"
    } else {
        alert('Seu email ou senha estão errados. Tente novamente.')
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
