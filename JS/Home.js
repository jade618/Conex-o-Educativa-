menu = document.querySelector('#menu')
valor = 1

const fucionamenu = ()=>{

    valor += 1

    if (valor == 2){
        document.querySelector('#overflow').style.display = 'block'
        document.querySelector('#links').style.display = 'block'
        menu.style.width = '30vw'
        menu.style.transition= '1s'
    }else{
        document.querySelector('#overflow').style.display = 'none'
        document.querySelector('#links').style.display = 'none'
        menu.style.width = '0'
        valor = 1
    }
   
}