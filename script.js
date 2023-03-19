let currentPokemon;
let countPokemons = 0;
let pokemons = [];

async function loadPokemons() {
    for (let i = 0; i < 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemons.push(currentPokemon);
        console.log('loaded pokemon', currentPokemon);
        document.getElementById('pokemonBigCard').innerHTML += smallCardTemplate();
    }
}

function smallCardTemplate() {
    return `
        <div class="pokemonsCard">
            <div class="pokemonsCardHeader">
                <h2 class="pokemonName" id="pokemonName">${currentPokemon['name']}</h2>
                <span id="pokemonNo">#${currentPokemon['id']}</span>
            </div>
            <div class="pokemonsCardHeaderBtn">
                <button class="headerBtn">green</button>
                <button class="headerBtn">black</button>

            </div>

            <img id="pokemonImageLogo" src="./img/pokemon_logo_small.png">
            <img id="pokemonImage" src="${currentPokemon['sprites']['other']['dream_world']['front_default']}">
        </div>
    `;
}

async function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonNo'). innerHTML = `#${currentPokemon['id']}`;
}