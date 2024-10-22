// First, install axios via npm or include it in your project
// npm install axios

const axios = require("axios");

// Function to fetch data of a specific Pokémon
function getPokemonData(pokemonName) {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      console.log(response.data); // Logs all the data about the Pokémon
      // Example of accessing some properties
      console.log(`Name: ${response.data.name}`);
      console.log(`Height: ${response.data.height}`);
      console.log(`Weight: ${response.data.weight}`);
      console.log(
        `Abilities: ${response.data.abilities
          .map((ability) => ability.ability.name)
          .join(", ")}`
      );
    })
    .catch((error) => {
      console.error("Error fetching Pokémon data:", error);
    });
}

// Fetch data for Pikachu
getPokemonData("pikachu");
export default getPokemonData;
