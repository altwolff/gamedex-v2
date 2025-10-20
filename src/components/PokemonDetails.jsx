import React from "react";

export function PokemonDetails({ pokemon, getStatColor }) {
  if (!pokemon) return <div className="text-center text-muted mt-4"></div>;

  return (
    <div className="card p-3">
      <div className="text-center mb-2">
        <img src={pokemon.sprite} alt={pokemon.name} style={{ width: 150 }} className="d-block mx-auto" />
        <h4 className="mt-2 text-capitalize">
          #{pokemon.id} {pokemon.name}
        </h4>
      </div>
      <div className="mb-2"><strong>Types:</strong> {pokemon.types.join(", ")}</div>
      <div className="mb-2"><strong>Height:</strong> {pokemon.height} m</div>
      <div className="mb-2"><strong>Weight:</strong> {pokemon.weight} kg</div>
      <h5 className="mt-3">Stats</h5>
      {pokemon.stats.map((s) => (
        <div key={s.name} className="mb-2">
          <div className="d-flex justify-content-between">
            <small>{s.name.toUpperCase()}</small>
            <small>{s.base_stat}</small>
          </div>
          <div className="progress">
            <div
              className={`progress-bar ${getStatColor(s.base_stat)}`}
              role="progressbar"
              style={{ width: `${Math.min(s.base_stat, 100)}%` }}
            ></div>
          </div>
        </div>
      ))}
      <h6 className="mt-3">Abilities</h6>
      <div>
        {pokemon.abilities.map((a) => (
          <span
            key={a.name}
            className={a.hidden ? "badge bg-warning text-dark me-1" : "badge bg-primary me-1"}
          >
            {a.name}
          </span>
        ))}
      </div>
    </div>
  );
}
