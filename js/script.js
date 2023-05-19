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
    const validTypes = ['grass', 'water', 'bug', 'normal', 'poison', 'electric', 'ground', 'fairy', 'fighting', 'psychic', 'rock'];
    let typeId = document.getElementById(`pokemonsCard${i}`);

    if (validTypes.includes(type)) {
        typeId.classList.add(type);
    }
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

async function loadNextPokemon(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id + 1}/`;
    let response = await fetch(url);
    if (response.ok) { // check if HTTP-status is 200-299
        currentPokemon = await response.json();
        document.getElementById('pokemonStatsCard').innerHTML = bigCardTemplate(id, currentPokemon);
        loadTypes(currentPokemon, id);
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

async function loadPrevPokemon(id) {
    if(id > 1) { // No need to make a request if id is 1, since no Pokemon with id lower than 1 exists
        let url = `https://pokeapi.co/api/v2/pokemon/${id - 1}/`;
        let response = await fetch(url);
        if (response.ok) { // check if HTTP-status is 200-299
            currentPokemon = await response.json();
            document.getElementById('pokemonStatsCard').innerHTML = bigCardTemplate(id - 2, currentPokemon);
            loadTypes(currentPokemon, id - 2);
        } else {
            alert("HTTP-Error: " + response.status);
        }
    }
}

function openAbout(i) {
    document.getElementById('statsAbout').classList.add('underline');
    document.getElementById('statsBaseStats').classList.remove('underline');
    document.getElementById('statsMoves').classList.remove('underline');
    document.getElementById('containerShowStats').innerHTML = aboutTemplate(i);
}

function openBaseStats(i) {
    document.getElementById('statsAbout').classList.remove('underline');
    document.getElementById('statsBaseStats').classList.add('underline');
    document.getElementById('statsMoves').classList.remove('underline');
    document.getElementById('containerShowStats').innerHTML = statsTemplate(i);
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