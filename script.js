let currentPokemon;

let countPokemons = 0;

let searchedPokemon = [];

let allPokemons = [];

async function init() {
    loadPokemons();
}

async function loadPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0`;
    let response = await fetch(url);
    let respondPokemon = await response.json();
    let allPokemon = respondPokemon['results']
    allPokemons.push(allPokemon);

    load20Pokemons();
}

async function load20Pokemons() {
    for (let i = countPokemons; i < countPokemons + 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('loaded pokemon', currentPokemon);
        document.getElementById('pokemonBigCard').innerHTML += smallCardTemplate(i);
        loadTypes(currentPokemon, i);
    }
    countPokemons += 20;
}

function loadTypes(currentPokemon, i) {
    for (let j = 0; j < currentPokemon["types"].length; j++) {
        const type = currentPokemon["types"][j]["type"]["name"];
        document.getElementById(`pokemonsCardHeaderBtn${i}`).innerHTML += typeInfoTemplate(type);
        renderTypes(type, i);
    }
}

function renderTypes(type, i) {
    let typeId = document.getElementById(`pokemonsCard${i}`);
    if (type == 'grass') {
        typeId.classList.add('grass');
    }
    if (type == 'water') {
        typeId.classList.add('water');
    }
    if (type == 'bug') {
        typeId.classList.add('bug');
    }
    if (type == 'normal') {
        typeId.classList.add('normal');
    }
    if (type == 'poison') {
        typeId.classList.add('poison');
    }
    if (type == 'electric') {
        typeId.classList.add('electric');
    }
    if (type == 'ground') {
        typeId.classList.add('ground');
    }
    if (type == 'fairy') {
        typeId.classList.add('fairy');
    }
    if (type == 'fighting') {
        typeId.classList.add('fighting');
    }
    if (type == 'psychic') {
        typeId.classList.add('psychic');
    }
    if (type == 'rock') {
        typeId.classList.add('rock');
    }
}

function typeInfoTemplate(type) {
    return `
    <button class="headerBtn">${type}</button>
    `;
}

function smallCardTemplate(i) {
    return `
        <div class="pokemonsCard" id="pokemonsCard${i}" onclick="openPokemonStats(${i})">
            <div class="pokemonsCardHeader">
                <h2 class="pokemonName" id="pokemonName">${currentPokemon['name']}</h2>
                <span id="pokemonNo">#${currentPokemon['id']}</span>
            </div>
            <div class="pokemonsCardHeaderBtn" id="pokemonsCardHeaderBtn${i}">
                
            </div>

            <img id="pokemonImageLogo" src="./img/pokemon_logo_small.png">
            <img id="pokemonImage" src="${currentPokemon['sprites']['other']['dream_world']['front_default']}">
        </div>
    `;
}

async function openPokemonStats(i) {
    document.getElementById('pokemonStatsCard').classList.remove('d-none');

    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    document.getElementById('pokemonStatsCard').innerHTML = bigCardTemplate(i);
    loadTypes(currentPokemon, i);
}

function bigCardTemplate(i) {
    return `
        <div class="pokemonsCard" id="pokemonsCard${i}">
            <div class="pokemonsCardHeader">
                <h2 class="pokemonName" id="pokemonName">${currentPokemon['name']}</h2>
                <span id="pokemonNo">#${currentPokemon['id']}</span>
            </div>
            <div class="pokemonsCardHeaderBtn" id="pokemonsCardHeaderBtn${i}">
                
            </div>

            <img id="pokemonImageLogo" src="./img/pokemon_logo_small.png">
            <img id="pokemonImage" src="${currentPokemon['sprites']['other']['dream_world']['front_default']}">
        </div>
    `;
}

                        /*  SEARCH FUNCTION*/

function searchPokemon() {
    let search = document.getElementById('search').value;
    searchValue = search.toLowerCase();
    console.log(searchValue);
    renderSearch(searchValue);
    search.value = '';
}

async function renderSearch(searchValue) {
    for (let i = 0; i < allPokemons.length; i++) {
        const pokemon = allPokemons[i];
        const name = pokemon['name'];
        if (name.includes(searchValue)) {
            let pokemonResponse = await fetch(pokemon['url']);
            let pokemonAsJson = await pokemonResponse.json();
            searchedPokemon.push(pokemonAsJson);
            console.log(searchedPokemon);
            showSearch();
        }
    }
}

function showSearch() {
    for (let i = 0; i < searchedPokemon.length; i++) {
        const showPokemon = searchedPokemon[i];
        document.getElementById('pokemonBigCard').innerHTML += smallCardTemplate(showPokemon);
        //loadTypes(currentPokemon, searchedPokemon);
    }
}