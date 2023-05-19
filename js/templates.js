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

function showLoadMoreBtn() {
    document.getElementById('loadMoreBtnContainer').innerHTML = `        
        <button class="loadMoreBtn" id="loadMoreBtn" onclick="loadPokemons()">Load more Pokemons</button>
    `;
}

function typeInfoTemplate(type) {
    return `
    <button class="headerBtn">${type}</button>
    `;
}

function bigCardTemplate(i) {
    const ability0 = currentPokemon['abilities']['0']
        ? currentPokemon['abilities']['0']['ability']['name']
        : ''; // Ovde možete postaviti šta god želite da se prikaže kada ne postoji sposobnost
    const ability1 = currentPokemon['abilities']['1']
        ? currentPokemon['abilities']['1']['ability']['name']
        : ''; // Isto važi i za ovde
    return `
    <div class="popupPokemon" id="popupPokemon" onclick="doNotClose(event)">
        <div class="pokemonsCardBig" id="pokemonsCard${i}">
            <div class="arrows">
                <span class="spanArrows pointer" onclick="loadPrevPokemon(${currentPokemon['id']})"> < </span>
                <span class="spanArrows pointer" onclick="loadNextPokemon(${currentPokemon['id']})"> > </span>
            </div>
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
                    <p class="stats">${(currentPokemon['height'] * 10)} cm</p>
                    <p class="stats">${currentPokemon['weight'] / 10} kg</p>
                    <p class="stats">${currentPokemon['base_experience']}</p>
                    <p class="stats">${ability0}</p>
                    <p class="stats">${ability1}</p>
                </div>
            </div>
        </div>
    </div>
    `;
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
