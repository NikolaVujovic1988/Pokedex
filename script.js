let currentPokemon;
let countPokemons = 0;
let pokemons = [];

async function loadPokemons() {
    //for (let i = countPokemons; countPokemons < 20; i++) {
    //    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    //    let response = await fetch(url);
    //    currentPokemon = await response.json();
    //    pokemons.push(currentPokemon);
    //    console.log('loaded pokemon', currentPokemon);
    //}
    let url = 'https://pokeapi.co/api/v2/pokemon/1/';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('loaded pokemon', currentPokemon);
    //countPokemons = i;
    renderPokemonInfo();
}

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonNo'). innerHTML = `#${currentPokemon['id']}`;
}