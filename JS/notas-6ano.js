function memorizaNomes() {
    const studentNames = {
        nomes: ["Aline Oliveira de Souza", "Amanda Ribeiro da Cruz", "Bruna Costa Ribeiro", "Camila Pereira da Costa", "Diego Lima Pereira", "Ester dos Santos Pires", "Felipe Gomes Pinto", "Gabriel Santos Oliveira", "Gustavo Martins Almeida", "Henrique Pereira Carvalho", "Isabela Costa Pereira", "Jade Vasconcelo Teixeira", "Jhenifer Souza Cardoso", "Júlia Santos Martins", "Larissa Marques Pinto", "Letícia Silva Rodrigues", "Lucas Cardoso Ribeiro", "Marcos Oliveira Carvalho", "Maria Clara Chicaroni", "Maria Eduarda de Souza Ferreira", "Mariana Fernandes da Silva", "Marina Almeida Lima", "Mateus Fernandes Gomes", "Paola Martins Oliveira", "Pedro Almeida Ferreira", "Rafaela Rodrigues da Cruz", "Renan Fernandes Ferreira", "Sofia Pereira da Silva", "Thiago Ferreira Santos", "Vinícius Gomes Almeida"]
    };
    localStorage.setItem('nomes', JSON.stringify(studentNames));
    return JSON.parse(localStorage.getItem('nomes'));
}

const listaNomes = memorizaNomes()

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAndStore30RandomSeries(providedValues = null) {
    const randomSeries = providedValues || [];

    if (!providedValues) {
        for (let j = 0; j < 30; j++) {
            const randomNumbers = [];
            for (let i = 0; i < 3; i++) {
                const randomNumber = getRandomInt(1, 10);
                randomNumbers.push(randomNumber);
            }
            randomSeries.push(randomNumbers);
        }
    }

    localStorage.setItem('randomNumbersSeries', JSON.stringify(randomSeries));
}

function getStoredRandomNumbersSeries() {
    const storedSeries = localStorage.getItem('randomNumbersSeries');

    if (storedSeries) {
        return JSON.parse(storedSeries);
    } else {
        generateAndStore30RandomSeries();
        return JSON.parse(localStorage.getItem('randomNumbersSeries'));
    }
}

function capturarValores(indice) {
    const tdList = document.querySelectorAll(`.notas${indice}`);
    const valores = [];

    tdList.forEach(td => {
        const input = td.querySelector('input');
        if (input) {
            valores.push(Number(input.value));
        } else {
            valores.push(Number(td.textContent.trim()));
        }
    });

    return valores;
}

function atualizarNota(indice) {
    const tdList = document.querySelectorAll(`.notas${indice}`);

    tdList.forEach((td, idx) => {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = td.textContent.trim();
        input.className = `receba-${indice}-${idx}`;
        input.style.width = '100px';
        input.style.textAlign = 'center';
        input.dataset.originalContent = td.textContent;

        td.textContent = '';
        td.appendChild(input);
    });

    document.querySelector(`.bt${indice}`).style.display = 'none';
    document.querySelector(`.botao${indice}`).style.display = 'inline-block';
}

function restaurarNota(indice) {
    const tdList = document.querySelectorAll(`.notas${indice}`);

    tdList.forEach(td => {
        const input = td.querySelector('input');
        if (input) {
            const novoValor = input.value;
            const texto = document.createTextNode(novoValor);
            td.textContent = '';
            td.appendChild(texto);
        }
    });

    const valoresAtualizados = capturarValores(indice);
    const dados = {
        nome: listaNomes.nomes[indice - 1],
        n1: valoresAtualizados[0],
        n2: valoresAtualizados[1],
        n3: valoresAtualizados[2],
        media: ((valoresAtualizados[0] + valoresAtualizados[1] + valoresAtualizados[2]) / 3).toFixed(1)
    };

    const mediaTd = document.querySelector(`.media${indice}`);
    mediaTd.textContent = dados.media;

    document.querySelector(`.bt${indice}`).style.display = 'inline-block';
    document.querySelector(`.botao${indice}`).style.display = 'none';

    // Atualizar no localStorage
    const randomNumbersSeries = getStoredRandomNumbersSeries();
    randomNumbersSeries[indice - 1] = [dados.n1, dados.n2, dados.n3];
    localStorage.setItem('randomNumbersSeries', JSON.stringify(randomNumbersSeries));
}

function estruturaIncorporada() {
    const tbody = document.querySelector('tbody');
    const randomNumbersSeries = getStoredRandomNumbersSeries();

    for (let i = 0; i < 30; i++) {
        const dados = {
            nome: listaNomes.nomes[i],
            n1: randomNumbersSeries[i][0],
            n2: randomNumbersSeries[i][1],
            n3: randomNumbersSeries[i][2],
            media: ((randomNumbersSeries[i][0] + randomNumbersSeries[i][1] + randomNumbersSeries[i][2]) / 3).toFixed(1)
        };

        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <th scope="row"><img src="imagem/img${i + 1}.jpeg" alt="nada"></th>
            <th scope="row">${i + 1}</th>
            <td>${dados.nome}</td>
            <td class="notas${i + 1}">${dados.n1}</td>
            <td class="notas${i + 1}">${dados.n2}</td>
            <td class="notas${i + 1}">${dados.n3}</td>
            <td class="media${i + 1}">${dados.media}</td>
            <td>
                <button type="button" class="bt${i + 1} btn btn-primary" onclick="atualizarNota(${i + 1})">Editar</button>
                <button type="button" class="botao${i + 1} btn btn-danger" style="display: none" onclick="restaurarNota(${i + 1})">Salvar</button>
            </td>`;
        tbody.appendChild(novaLinha);
    }
}

// Inicializar a tabela com dados
document.addEventListener('DOMContentLoaded', () => {
    estruturaIncorporada();
});
