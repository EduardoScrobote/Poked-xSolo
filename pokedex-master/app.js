const url = id => `https://pokeapi.co/api/v2/pokemon/${id}`  // essa variavel url recebe como valor a url da api que se refere aos pokemons

const getPokemons = () => {  //! Essa função será responsavel por pegar todos os pokemons e seus dados.
    const pokemonPromises = [] // cria um array vazio para armazenar as promises

    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(url(i)).then(response => response.json())) //esse for pega todos os index, e todas suas informações e passa para JSON
    }

    Promise.all(pokemonPromises) // esse metódo pega todos os dados dos pokemons obtidos pelos seus index no for acima, e executa eles no código abaixo.
        .then(pokemons => { // pokemon promises é uma promessa, por isso começamos com .then nessa linha, e passamos o parametro pokemon abrindo uma callBackFunction

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => { // estou reduzindo os pokemons, passando como parametro padrão accumulator, e pokemons 
                const types = pokemon.types.map(typeInfo => typeInfo.type.name) // aqui estou passando um map em types, para pode descobrir o tipo, e tirando como dados type.name
                accumulator += `<li class="card ${types[0]} "> 
                                <img class="card-image" alt="${pokemon.name}" src="${pokemon.sprites.front_default}"></img> 
                                <h2 class="card-title">${pokemon.id} ${pokemon.name}</h2>
                                <p class="card-sub-title">${types.join(' | ')}</p>
                                </li>`
                return accumulator // accumulator vai receber a função de concatenar lis img h2 e p com os nomes tipos e imagem de fundo do pokemon
            }, '')
            const ul = document.querySelector('[data-js="pokedex"]') // estou pegando o caminho para a ul que eu vou concatenar minhas lis
            ul.innerHTML = lisPokemons
        })
};
getPokemons()

