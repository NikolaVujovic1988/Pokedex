let currentPokemon;

let countPokemons = 0;

async function loadPokemons() {
    for (let i = countPokemons; i < countPokemons + 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('loaded pokemon', currentPokemon);
        document.getElementById('pokemonBigCard').innerHTML += smallCardTemplate(i);
        loadTypes(currentPokemon, i);
    }
    countPokemons += 20;
    console.log(countPokemons);
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