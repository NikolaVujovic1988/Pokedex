let currentPokemon;

async function loadPokemons() {
    for (let i = 0; i < 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('loaded pokemon', currentPokemon);
        document.getElementById('pokemonBigCard').innerHTML += smallCardTemplate(i);
        loadTypes(currentPokemon, i);
    }
}

function loadTypes(currentPokemon, i) {
    for (let j = 0; j < currentPokemon["types"].length; j++) {
        const type = currentPokemon["types"][j]["type"]["name"];
        console.log(type);
        document.getElementById(`pokemonsCardHeaderBtn${i}`).innerHTML += typeInfoTemplate(type);   
        renderTypes(type, i); 
    }
}

function renderTypes(type, i) {
    let typeId = document.getElementById(`pokemonsCard${i}`);
    if (type == 'grass') {
        typeId.classList.add('grass');
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