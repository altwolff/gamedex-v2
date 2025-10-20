import React, { useState, useEffect } from "react";
import { PokemonRow } from "./PokemonRow";
import { PokemonDetails } from "./PokemonDetails";
import { ErrorBox } from "./ErrorBox";
import { fetchPokemons, fetchPokemonsByType } from "../services/pokemonService";
import { getStatColor } from "../utils/getStatColor";
import { getPokemonDetails } from "../services/pokemonService";

export function GameDexApp() {
  const [all, setAll] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [useJSX, setUseJSX] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const pokemons = await fetchPokemons(50, setProgress);
        setAll(pokemons);
        setFiltered(pokemons);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  const handleSearch = async (q) => {
    const v = q.toLowerCase().trim();
    if (!v) return setFiltered(all);

    const results = all.filter(
      (p) => p.name.toLowerCase().includes(v) || p.id.toString().includes(v)
    );

    if (results.length === 0) {
      try {
        const pokemon = await getPokemonDetails(v);
        if (pokemon) {
          setFiltered([pokemon]);
          return;
        }
      } catch (err) {
        setError(`No Pokémon found for "${q}"`);
      }
    } else {
      setFiltered(results);
    }
  };

  const handleFilter = async (type) => {
    if (!type) return setFiltered(all);
    try {
      const filteredByType = await fetchPokemonsByType(type, setProgress);
      setFiltered(filteredByType);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelect = (p) => setSelected(p);
  const toggleMode = () => setUseJSX((prev) => !prev);

  const types = ["", "normal", "fire", "water", "grass", "electric", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"];

  return (
    <div className="container mt-3">
      <div className="progress mb-3" style={{ height: 25 }}>
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          {progress}%
        </div>
      </div>

      <ErrorBox message={error} onClose={() => setError("")} />

      <div className="d-flex mb-3 gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search Pokémon by name or ID"
          onInput={(e) => handleSearch(e.target.value)}
        />
        <select className="form-select" onChange={(e) => handleFilter(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>
              {t ? t.charAt(0).toUpperCase() + t.slice(1) : "All Types"}
            </option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={toggleMode}>
          {useJSX ? "JSX Mode" : "createElement Mode"}
        </button>
      </div>

      <div className="row">
        <div className="col-md-8">
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr><th>#</th><th>Name</th><th>Sprite</th></tr>
            </thead>
            <tbody>
              {filtered.length ? (
                filtered.map((p) => (
                  <PokemonRow key={p.id} pokemon={p} onSelect={handleSelect} useJSX={useJSX} />
                ))
              ) : (
                <tr><td colSpan="3">No Pokémon to display</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <PokemonDetails pokemon={selected} getStatColor={getStatColor} />
        </div>
      </div>
    </div>
  );
}
