const searchInput = document.querySelector("#poke-input");
const searchBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");

const pokeCount = 151;

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let url = ` https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  createPokemonBox(data);
};

function createPokemonBox(pokemon) {
  const { name, weight } = pokemon;
  const id = pokemon.id.toString().padStart(3, "0");
  const type = pokemon.types[0].type.name;

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.innerHTML = buildHtmlOfPokemon(id, name, weight, type);
  pokeContainer.appendChild(pokemonEl);
}

function buildHtmlOfPokemon(id, name, weight, type) {
  return `

        <img class="bd-placeholder-img card-img-top poke-img bg-dark" width="100%" height="225" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png"
              alt="${name} Pokemon"/>
              <h3 class="text-center bg-light poke-name">${name}</h3>
              <p class="text-center bg-dark text-light poke-id"># ${id} </br> ${weight} kg </br> Type :${type}</p>
    `;
}

initPokemon();
searchInput.addEventListener("input", function (e) {
  const pokeNames = document.querySelectorAll(".poke-name");
  const search = searchInput.value.toLowerCase();

  pokeNames.forEach((pokeName) => {
    pokeName.parentElement.style.display = "block";

    if (!pokeName.innerHTML.toLowerCase().includes(search)) {
      pokeName.parentElement.style.display = "none";
    }
  });
});
