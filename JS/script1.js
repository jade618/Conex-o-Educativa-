(() => {
    'use strict'
  
    
    const forms = document.querySelectorAll('.needs-validation')
  
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            form.classList.add('was-validated')
        } else {
            inserirNota()
            form.classList.remove('was-validated')
            form.reset()
        }

        event.preventDefault()
        event.stopPropagation()
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

let tbody = document.querySelector('#tabela>tbody')

formulario = document.querySelector('#form')
nome = document.querySelector('#txtNome')
nota1= document.querySelector('#txtnota1')
nota2= document.querySelector('#txtnota2')
nota3= document.querySelector('#txtnota3')
botao = document.querySelector('#btnsalvar')
add = document.querySelector('#add')


const adicionar = ()=>{
    const senhaa = prompt(`digite a senha para editar`);

    if(senhaa == '12345'){
        add.style.display = 'none'
        formulario.style.display = 'block'
    }else{
        alert('A senha esta errada!')
    }
        
}


editaId = null

function getLocalStorage() {
    //caso ela exista retorne a variável para mim, caso não, retorne um array vazio
    return JSON.parse(localStorage.getItem('bd_contatos')) ?? []
}


function setLocalStorage(bd_contatos) {
    
    localStorage.setItem('bd_contatos', JSON.stringify(bd_contatos))
}

function atualizarTabela() {
    
   
    tbody.innerHTML = "" 
    const bd_contatos = getLocalStorage()
    bd_contatos.forEach(inserLinhaTabela)
     
}

function inserLinhaTabela(alunos, index) {
    const novaLinha = document.createElement('tr')
    media =(parseInt(alunos.nota1) + parseInt(alunos.nota2) + parseInt(alunos.nota3))/3
    novaLinha.innerHTML = `
        <th scope="row">${index+1}</th>
        <td>Foto</td>
        <td>${alunos.nome}</td>
        <td><input type = "number" min = "0" max = "10"  readonly value = "${alunos.nota1}" id = "nota1"/></td>
        <td><input type = "number" min = "0" max = "10" readonly  value = "${alunos.nota2}" id = "nota2"/></td>
        <td><input type = "number" min = "0" max = "10" readonly  value = "${alunos.nota3}" id = "nota3"/></td>
        <td>${media.toFixed(2)}</td> 
        <td>
            <button type="button" class="botao_coiso col-12 col-md-10 col-lg-5 btn btn-warning" id="${index}" onclick="preparaEditacao(${index})"> Editar </button>
            <button type="button" class="botao_coiso col-12 col-md-10 col-lg-5 btn btn-danger" id="${index}" onclick="excluirNota(${index})"> Excluir </button>
        </td>        
    ` 
    
    const nota1 = (document.getElementById("#nota1"))
    const nota2 = (document.getElementById("#nota2"))
    const nota3 = (document.getElementById("#nota3"))
    


    tbody.appendChild(novaLinha)
}

function inserirNota() {

    const alunos = {
        nome: document.getElementById('txtNome').value,
        nota1: document.getElementById('txtnota1').value,
        nota2: document.getElementById('txtnota2').value,
        nota3: document.getElementById('txtnota3').value
    }

    if (parseInt(alunos.nota1) <= 10 && parseInt(alunos.nota2) <= 10 && parseInt(alunos.nota3) <= 10){
        if (parseInt(alunos.nota1) >= 0 && parseInt(alunos.nota2) >= 0 && parseInt(alunos.nota3) >= 0){
            
            
            let bd_contatos = getLocalStorage()
           
            if (editaId == null) {
                bd_contatos.push(alunos)
                
                setLocalStorage(bd_contatos)

                atualizarTabela()
                add.style.display = 'block'
                formulario.style.display = 'none'
                

            } else {
                editarNota(bd_contatos, editaId)
            }   

        }else{
            alert('coloque uma nota entre 0 e 10')
        }
        
    }else{
        alert('coloque uma nota entre 0 e 10')
    }
   
}

function editarNota(bd_contatos, index) { 


    bd_contatos[index].nome = nome.value
    bd_contatos[index].nota1 = nota1.value
    bd_contatos[index].nota2 = nota2.value
    bd_contatos[index].nota3 = nota3.value

    
        //Alterar informações no localStorage
        setLocalStorage(bd_contatos)

        //Mudar o nome do botão
        botao.value = "Inserir"

        //Mudar valor da variável editaId
        editaId = null

        //Atualizar tabela
        formulario.style.display = 'none'

        atualizarTabela()  
         add.style.display = 'block'
        alert(`a  atualização dos dados do aluno foram realizadas com sucesso`);
}
    
    

function excluirNota(index) {
    //capturar nome do aluno
    let bd_contatos = getLocalStorage()
    nome =  bd_contatos[index].nome
    //criar a=input para digitar o motivo
    const motivo = prompt(`Qual o motivo da exclusão do aluno ${nome}? (O aluno saiu da escola, o aluno mudou de turma)`);
    const senha = prompt(`digite a senha para excluir`);
    //confirmação da exclusão
    if (senha == '12345'){
        if (motivo) {
            const confirmarExclusao = confirm(`Deseja realmente excluir o aluno ${nome} da chamada?\nMotivo: ${motivo}`);
            if (confirmarExclusao) {
                alert(`O aluno ${nome} foi excluído da chamada.`);
                let bd_contatos = getLocalStorage()
                bd_contatos.splice(index, 1)
                setLocalStorage(bd_contatos)
                atualizarTabela()    
            }
        }
    }else{
        alert('a senha esta errada!')
    }
   
}

function preparaEditacao(index) {
    //Acessa as informações
    let bd_contatos = getLocalStorage()
    editaId = index
    nome1 = bd_contatos[index].nome
    const confirmar = confirm(`Deseja realmente editar os valores do aluno ${nome1} ?`);
    const senhae = prompt(`digite a senha para editar`);

    if (senhae == '123456'){
        if (confirmar) {
            formulario.style.display = 'block'
             //Repassa os dados para dentro do campo de formulário
            nome.value = nome1
            nota1.value = bd_contatos[index].nota1
            nota2.value = bd_contatos[index].nota2
            nota3.value = bd_contatos[index].nota3
    
            //Mudar o nome do botão
            botao.value = "Atualizar"
        }
       
    }else{
        alert('A senha esta errada;')
    }
    
}

//Chamar a função para mostrar os dados
atualizarTabela()

//função para adicionar alunofunction adicionar() 

document.getElementById("add").addEventListener("click", function() {
    document.getElementById("form").style.display = "block";
});