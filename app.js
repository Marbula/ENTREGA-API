document.getElementById("searchBtn").addEventListener("click", async () => {
  const pokemonId = document.getElementById("pokemonId").value;
  const container = document.getElementById("pokemonContainer");
  container.innerHTML = "";

  if (!pokemonId) {
    container.innerHTML =
      '<p class="error">Please enter a valid Pokémon ID.</p>';
    return;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const pokemon = await response.json();
    const pokemonCard = `
        <div class="pokemon-card">
          <h2>${pokemon.name.toUpperCase()}</h2>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          <p>Type: ${pokemon.types.map((type) => type.type.name).join(", ")}</p>
          <p>Height: ${(pokemon.height / 10).toFixed(2)} meters</p>
          <p>Weight: ${(pokemon.weight / 10).toFixed(2)} kg</p>
        </div>
      `;

    container.innerHTML = pokemonCard;
  } catch (error) {
    container.innerHTML = `<p class="error">${error.message}</p>`;
  }
});
