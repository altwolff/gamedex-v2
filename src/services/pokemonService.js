export async function getPokemonDetails(identifier) {
    try {
      const url =
        typeof identifier === "string" && identifier.startsWith("http")
          ? identifier
          : `https://pokeapi.co/api/v2/pokemon/${identifier}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Could not fetch details for ${identifier}`);
      const data = await res.json();
      return {
        id: data.id,
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        sprite: data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
        stats: data.stats.map((s) => ({ name: s.stat.name, base_stat: s.base_stat })),
        abilities: data.abilities.map((a) => ({ name: a.ability.name, hidden: a.is_hidden })),
        height: (data.height / 10).toFixed(1),
        weight: (data.weight / 10).toFixed(1),
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  export async function fetchPokemons(limit = 50, onProgress) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch Pokémon list");
    const data = await res.json();
    const all = [];
    for (let i = 0; i < data.results.length; i++) {
      const detail = await getPokemonDetails(data.results[i].url);
      all.push(detail);
      if (onProgress) onProgress(Math.round(((i + 1) / data.results.length) * 100));
    }
    return all;
  }
  
  export async function fetchPokemonsByType(type, onProgress) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!res.ok) throw new Error(`Could not fetch Pokémon of type ${type}`);
    const data = await res.json();
    const detailed = [];
    const sliceLimit = 50;
    for (let i = 0; i < Math.min(data.pokemon.length, sliceLimit); i++) {
      const p = await getPokemonDetails(data.pokemon[i].pokemon.url);
      detailed.push(p);
      if (onProgress)
        onProgress(Math.round(((i + 1) / Math.min(data.pokemon.length, sliceLimit)) * 100));
    }
    return detailed;
  }
  