
alunos = {email:['aluno@gmail.com'] , senha:['12345']}

function validar() {
    email = alunos.email
    senha = alunos.senha
    in_email = document.querySelector('#inputEmail').value
    in_senha = document.querySelector('#inputPassword').value

    for (i of email){
    
        if (in_email == i){
            se = (senha.indexOf(i) )+ 1
                if(in_senha == senha[se]){
                    window.open("alunos6A.html")
                    break
                }else{
                    alert('sua senha ou login estão erradas.Tente novamente.')
                }
        }else{
            alert('sua senha ou login estão erradas.Tente novamente.') 
        }
    }
        

  
       
}



function aparecer() {
    let inputPass = document.getElementById('senha')
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