function memorizaNomesEmPartes() {
    const nomes6A = [
        "Lucas da Silva Santos", "Ana Carolina Oliveira Lima", "Gabriel Pereira Costa",
        "Isabela Santos Rodrigues", "Felipe Martins Almeida", "Mariana Oliveira Souza",
        "Rafael Silva Gomes", "Juliana Costa Pereira", "Leonardo Almeida Rodrigues",
        "Carolina Fernandes Silva", "Pedro Oliveira Santos", "Camila Lima Castro",
        "Matheus Santos Costa", "Larissa Almeida Rodrigues", "Thiago Martins Oliveira",
        "Marina Costa Lima", "João Silva Pereira", "Amanda Santos Almeida",
        "Bruno Oliveira Costa", "Fernanda Lima Santos", "Gustavo Costa Almeida",
        "Luiza Silva Rodrigues", "Daniel Martins Lima", "Renata Oliveira Costa",
        "Eduardo Santos Pereira"
    ];

    const nomes6B = [
        "Lucas Ferreira Rocha", "Isabela Cardoso Gomes", "Gabriel Pereira Mendes",
        "Carolina Santos Barbosa", "Matheus Lima Fernandes", "Mariana Castro Neves",
        "Rafael Alves Ribeiro", "Juliana Costa Vieira", "Leonardo Oliveira Carvalho",
        "Larissa Nunes Pinto", "Pedro Silva Marques", "Camila Rodrigues Teixeira",
        "Thiago Santos Alencar", "Amanda Costa Viana", "João Martins Medeiros",
        "Fernanda Almeida Guerra", "Bruno Souza Freitas", "Marina Pereira Lima",
        "Gustavo Gomes Andrade", "Luiza Carvalho Monteiro", "Daniel Fernandes Campos",
        "Renata Oliveira Pires", "Eduardo Lima Castro", "Felipe Almeida Dias",
        "Ana Santos Nogueira"
    ];

    const nomes7A = [
        "Lucas Xavier Valente", "Isabela Luna Santoro", "Gabriel Monteiro Ventura",
        "Carolina Amaro Santos", "Matheus Oliveira Vasconcelos", "Mariana Valentim Amaral",
        "Rafael Fontana Lima", "Juliana Serra Barbosa", "Leonardo Amaral Fontana",
        "Larissa Lima Martini", "Pedro Castelar Rocha", "Camila Ventura Gentile",
        "Thiago Santoro Martins", "Amanda Viana Oliveira", "João Melo Pereira",
        "Fernanda Caldas Ribeiro", "Bruno Menezes Carvalho", "Marina Valente Bruno",
        "Gustavo Franco Alves", "Luiza Miranda Romano", "Daniel Freitas Campos",
        "Renata Marques Novaes", "Eduardo Correia Mendes", "Felipe Alencar Silveira",
        "Ana Drummond"
    ];

    const nomes7B = [
        "Lorenzo De Luca", "Sofia Cristina Ricci", "Mateus Francisco Bianchi",
        "Giovana Sousa Martini", "Lucas Ferrari Oliveira", "Elena Romano",
        "Marco Barbo Nunes", "Valentina Moretti Castro", "Alessandro Gueleri Galli",
        "Luna Conti Gomes", "Giovanni Mancini Rocha", "Isabella Carvalho Dos Santos",
        "Francisco Pereira Ribeiro", "Giulia Pereira Souza", "Leonardo Tanigaki Gomes",
        "Sara Mendonça Amaral", "Antonio Marchetti", "Aurora De Angelis",
        "Lucas Gonçalves", "Francesca Amato Santos", "Alessio Bruno Araújo",
        "Greta Colombo Pinto", "Davide Esposito De Souza", "Sofia Santoro Almeida",
        "Gean Ferraro Campos"
    ];

    const nomes8A = [
        "Luca Rossi Souza", "Sofia De Luca Amaro", "Matteo Bianchi Pinto",
        "Giulia Conti Carvalho", "Marco Ferrari Lima", "Chiara Russo Pires",
        "Giovanni Moretti Silva", "Elena Martini França", "Alessandro Rinaldi Costa",
        "Francesca Romano", "Lorenzo Esposito", "Sarah Barbieri",
        "Jhenifer Marchetti Louzada", "Valentina Ferri", "Maria Clara Bertini Marini",
        "Sofia De Costa", "Leonardo Do Santos", "Maria Eduarda Vidal",
        "Laura Amorim", "Gisele Lima", "Thiago Amaral", "Alice Flor Fonseca",
        "Enrico Rico", "Lara Clara Pinto", "Gabriel Costa"
    ];

    const nomes8B = [
        "Lucas Mendes da Silva", "Ana Carolina Oliveira Santos", "Gabriel Almeida Costa",
        "Isabela Pereira Rodrigues", "Pedro Fernandes Lima", "Marina Barbosa Castro",
        "Rafael Gomes Cardoso", "Juliana Santos Almeida", "Matheus Costa Ribeiro",
        "Larissa Oliveira Martins", "Bruno Rodrigues Silva", "Camila Castro Nunes",
        "Thiago Almeida Ferreira", "Amanda Lima Rocha", "João Pereira Santos",
        "Mariana Fernandes Souza", "Gustavo Silva Vieira", "Luiza Costa Santos",
        "Leonardo Oliveira Castro", "Carolina Nunes Costa", "Daniel Ribeiro Alves",
        "Renata Martins Oliveira", "Eduardo Silva Barbosa", "Bianca Ramos Pereira",
        "Felipe Castro Mendes"
    ];

    const nomes9A = [
        "Thiago Santos Rocha", "Mariana Alves Costa", "Lucas Oliveira Ferreira",
        "Isabela Silva Campos", "Rafael Pereira Cardoso", "Larissa Souza Gonçalves",
        "Gabriel Costa Lima", "Juliana Fernandes Carvalho", "Matheus Ribeiro Barbosa",
        "Camila Gomes Miranda", "Pedro Rodrigues Castro", "Amanda Nunes Almeida",
        "Bruno Mars Oliveira", "Carolina Santos Vieira", "Leonardo Mendes Araújo",
        "Luiza Rocha Lima", "Felipe Carvalho Fernandes", "Manuela Castro Oliveira",
        "Daniel Pereira Silva", "Bianca Oliveira Santos", "Gustavo Rodrigues Cardoso",
        "Renata Almeida Campos", "Lucas Ferreira Costa", "Júlia Barbosa Rodrigues",
        "Miguel Santos Alves"
    ];

    const nomes9B = [
        "Felipe Rodrigues Goulart", "Larissa Freitas Miranda", "Bruno Oliveira Santana",
        "Rafael Costa Ribeiro", "Juliana Ramos Torres", "Lucas Martins Cardoso",
        "Isadora Lima Barbosa", "Gabriel Pereira Montenegro", "Carolina Alves Teixeira",
        "Matias Fernandes Neves", "Mariana Souza Guimarães", "Thiago Santos Peixoto",
        "Camila Vieira Medeiros", "Gustavo Castro Novaes", "Bruna Nogueira Viana",
        "Leonardo Cavalcanti Figueiredo", "Manuela Carvalho Dantas", "Renato Silva Siqueira",
        "Letícia Gonçalves Ferreira", "Pedro Miranda Alencar", "Jéssica Mendes Oliveira",
        "Rafaela Pereira Cruz", "Mateus Oliveira Lima", "Alessandra Gomes Cardoso"
    ];

    localStorage.setItem('nomes6A', JSON.stringify(nomes6A));
    localStorage.setItem('nomes6B', JSON.stringify(nomes6B));
    localStorage.setItem('nomes7A', JSON.stringify(nomes7A));
    localStorage.setItem('nomes7B', JSON.stringify(nomes7B));
    localStorage.setItem('nomes8A', JSON.stringify(nomes8A));
    localStorage.setItem('nomes8B', JSON.stringify(nomes8B));
    localStorage.setItem('nomes9A', JSON.stringify(nomes9A));
    localStorage.setItem('nomes9B', JSON.stringify(nomes9B));
}

function recuperaNomesOrdenados() {
    const todasAsChaves = ['nomes6A', 'nomes6B', 'nomes7A', 'nomes7B', 'nomes8A', 'nomes8B', 'nomes9A', 'nomes9B'];
    let todosOsNomes = [];

    todasAsChaves.forEach(chave => {
        const nomes = JSON.parse(localStorage.getItem(chave));
        if (nomes) {
            todosOsNomes = todosOsNomes.concat(nomes);
        }
    });

    return todosOsNomes.sort();
}

// Use as funções
memorizaNomesEmPartes();
const nomesOrdenados = recuperaNomesOrdenados();
console.log(nomesOrdenados);
