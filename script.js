let currentPokemon;

let countPokemons = 0;

let searchedPokemon = [];

let allPokemons = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchInput').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        searchPokemon();
      }
    });
  });

async function init() {
    showLoadingAnimation();
    await loadPokemons();
    hideLoadingAnimation();
  }

async function loadPokemons() {
    let url4AllPokemons = `https://pokeapi.co/api/v2/pokemon/?limit=1015&offset=0`;
    let response = await fetch(url4AllPokemons);
    let respondPokemon = await response.json();
    let allPokemon = respondPokemon['results'];
    allPokemons.push(allPokemon);
    load20Pokemons();
}

async function load20Pokemons() {
    for (let i = countPokemons; i < Math.min(countPokemons + 20, 1015); i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}/`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('loaded pokemon', currentPokemon);
        document.getElementById('pokemonBigCard').innerHTML += smallCardTemplate(i, currentPokemon);
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

function showLoadingAnimation() {
    document.getElementById('loadingAnimation').style.display = 'block';
}

function hideLoadingAnimation() {
    document.getElementById('loadingAnimation').style.display = 'none';
}

/* This fuction change background of pokemon cards by pokemon types*/

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

function smallCardTemplate(i, currentPokemon) {
    const defaultImage = currentPokemon['sprites']['other']['dream_world']['front_default'];
    const imageSrc = defaultImage ? defaultImage : '';
  
    let imageElement = '';
    if (imageSrc) {
      imageElement = `<img id="pokemonImage" src="${imageSrc}">`;
    }
  
    return `
    <div class="pokemonsCard" id="pokemonsCard${i}" onclick="openPokemonStats(${i}, ${currentPokemon.id})">
        <div class="pokemonsCardHeader">
             <h2 class="pokemonName" id="pokemonName">${currentPokemon['name']}</h2>
            <span id="pokemonNo">#${currentPokemon['id'].toString().padStart(4, '0')}</span>
        </div>
        <div class="pokemonsCardHeaderBtn" id="pokemonsCardHeaderBtn${i}">
            <img id="pokemonImageLogo" src="./img/pokemon_logo_small.png">
            ${imageElement}
        </div>
    </div>
    `;
  }

function typeInfoTemplate(type) {
    return `
    <button class="headerBtn">${type}</button>
    `;
}

async function openPokemonStats(i, pokemonId) {
    document.getElementById('pokemonStatsCard').classList.remove('d-none');
  
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;
    let response = await fetch(url);
    currentPokemon = await response.json();
  
    document.getElementById('pokemonStatsCard').innerHTML = bigCardTemplate(i, currentPokemon);
    document.getElementById('pokemonBigCard').classList.add('blur');
    loadTypes(currentPokemon, i);
    document.getElementById('statsAbout').classList.add('underline');
    document.getElementById('pokemonStatsCard').classList.add('z-index');
}

function bigCardTemplate(i) {
    return `
    <div class="popupPokemon" id="popupPokemon" onclick="doNotClose(event)">
        <div class="pokemonsCardBig" id="pokemonsCard${i}">
            <div class="pokemonsCardHeader">
                <h2 class="closeCard pointer" onclick="closePopup()">x</h2>
                <span id="pokemonNo">#${currentPokemon['id'].toString().padStart(4, '0')}</span>
            </div>
            <h2 class="pokemonNameBigCard" id="pokemonName">${currentPokemon['name']}</h2>
            <div class="pokemonsCardHeaderBtn" id="pokemonsCardHeaderBtn${i}">
                
            </div>

            <img id="pokemonImageLogo" src="./img/pokemon_logo_small.png">
            <img id="pokemonImage" src="${currentPokemon['sprites']['other']['dream_world']['front_default']}">
        </div>
        <div class="pokemonStatsPopup">
            <div class="statsHeader">
                <h4 id="statsAbout" onclick="openAbout(${i})">About</h4>
                <h4 id="statsBaseStats" onclick="openBaseStats(${i})">Base Stats</h4>
                <h4 id="statsMoves" onclick="openMoves(${i})">Moves</h4>
            </div>
            <div class="containerShowStats" id="containerShowStats">
                <div class="statsCharacteristics">
                    <p class="statsCharacteristicsP">Height:</p>
                    <p class="statsCharacteristicsP">Weight:</p>
                    <p class="statsCharacteristicsP">Experience:</p>
                    <p class="statsCharacteristicsP">Abilities:</p>
                </div>
                <div class="statsContainer">
                    <p class="stats">${(currentPokemon['height'] / 10).toFixed(2)} cm</p>
                    <p class="stats">${currentPokemon['weight'] / 10} kg</p>
                    <p class="stats">${currentPokemon['base_experience']}</p>
                    <p class="stats">${currentPokemon['abilities']['0']['ability']['name']}</p>
                    <p class="stats">${currentPokemon['abilities']['1']['ability']['name']}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function openAbout(i) {
    document.getElementById('statsAbout').classList.add('underline');
    document.getElementById('statsBaseStats').classList.remove('underline');
    document.getElementById('statsMoves').classList.remove('underline');
    document.getElementById('containerShowStats').innerHTML = aboutTemplate(i);
}

function aboutTemplate(i) {
    return `
            <div class="statsCharacteristics">
                <p class="statsCharacteristicsP">Height:</p>
                <p class="statsCharacteristicsP">Weight:</p>
                <p class="statsCharacteristicsP">Experience:</p>
                <p class="statsCharacteristicsP">Abilities:</p>
            </div>
            <div class="statsContainer">
                <p class="stats">${(currentPokemon['height'] / 10).toFixed(2)} cm</p>
                <p class="stats">${currentPokemon['weight'] / 10} kg</p>
                <p class="stats">${currentPokemon['base_experience']}</p>
                <p class="stats">${currentPokemon['abilities']['0']['ability']['name']}</p>
                <p class="stats">${currentPokemon['abilities']['1']['ability']['name']}</p>
            </div>
    `;
}

function openBaseStats(i) {
    document.getElementById('statsAbout').classList.remove('underline');
    document.getElementById('statsBaseStats').classList.add('underline');
    document.getElementById('statsMoves').classList.remove('underline');
    document.getElementById('containerShowStats').innerHTML = statsTemplate(i);
}

function statsTemplate(i) {
    return `
    <div class="statsProgressBar">
        <h4 class="h4progress">HP</h4>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats']['0']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${currentPokemon['stats']['0']['base_stat']}</div>
        </div>
   
        <h4 class="h4progress">Attack</h4>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats']['1']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${currentPokemon['stats']['1']['base_stat']}</div>
        </div>

        <h4 class="h4progress">Defense</h4>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats']['2']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${currentPokemon['stats']['2']['base_stat']}</div>
        </div>

        <h4 class="h4progress">Special attack</h4>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats']['3']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${currentPokemon['stats']['3']['base_stat']}</div>
        </div>

        <h4 class="h4progress">Special defense</h4>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats']['4']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${currentPokemon['stats']['4']['base_stat']}</div>
        </div>

        <h4 class="h4progress">Speed</h4>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${currentPokemon['stats']['5']['base_stat']}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${currentPokemon['stats']['5']['base_stat']}</div>
        </div>
    </div>
    `;
}

function openMoves() {
    document.getElementById('statsAbout').classList.remove('underline');
    document.getElementById('statsBaseStats').classList.remove('underline');
    document.getElementById('statsMoves').classList.add('underline');
    let movesContainer = document.getElementById('containerShowStats');
    movesContainer.innerHTML = '';
    let move = currentPokemon['moves'];
    for (let index = 0; index < move.length; index++) {
        const currentMove = currentPokemon['moves'][index]['move']['name'];
        movesContainer.innerHTML += 
    `
        <div class="moves" id="moves">    
            <p>"${currentMove}"</p>
        </div>
    `;
    }
    
}

/*  SEARCH FUNCTION*/

async function searchPokemon() {
    const searchValue = getSearchValue();
    hideLoadMoreButton();
  
    if (searchValue === '') {
      resetSearch();
      return;
    }
  
    await displayPokemonCards();
}

function getSearchValue() {
    return document.getElementById('searchInput').value;
}

function hideLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.classList.add('d-none');
}

function resetSearch() {
    document.getElementById('pokemonBigCard').innerHTML = '';
    countPokemons = 0;
    searchedPokemon = [];
    load20Pokemons();
}

function searchPokemons(searchValue) {
    return allPokemons[0].filter(pokemon => {
      return pokemon.name.includes(searchValue.toLowerCase());
    });
}

function showNoPokemonsFoundAlert() {
    // Change this with proper animation
    alert('No Pokemons with this name found.');
}

async function displayPokemonCards() {
    const searchedPokemon = searchPokemons(getSearchValue());
  
    if (searchedPokemon.length === 0) {
      showNoPokemonsFoundAlert();
      return;
    }
  
    document.getElementById('pokemonBigCard').innerHTML = '';
    countPokemons = 0;
  
    for (let i = 0; i < Math.min(searchedPokemon.length, 1015); i++) {
      let url = searchedPokemon[i].url;
      let response = await fetch(url);
      currentPokemon = await response.json();
      console.log('loaded pokemon', currentPokemon);
      document.getElementById('pokemonBigCard').innerHTML += smallCardTemplate(i, currentPokemon);
      loadTypes(currentPokemon, i);
    }
}
  

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('pokemonBigCard').innerHTML = '';
    let loadMoreBtn = document.getElementById('loadMoreBtn');

    loadMoreBtn.classList.remove('d-none');
    countPokemons = 0;
    init();
}

function doNotClose(event) {
    event.stopPropagation()
}

function closePopup() {
    document.getElementById('pokemonStatsCard').classList.add('d-none');
    document.getElementById('pokemonBigCard').classList.remove('blur');
    document.getElementById('pokemonStatsCard').classList.remove('z-index');
}