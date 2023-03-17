let currentPokemon;

async function loadPokemons() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('loaded pokemon', currentPokemon);

    renderPokemon();
}

function renderPokemon() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
}