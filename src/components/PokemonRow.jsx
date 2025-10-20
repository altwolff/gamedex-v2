import React from "react";

export function PokemonRow({ pokemon, onSelect, useJSX }) {
  if (!useJSX) {
    return React.createElement(
      "tr",
      { style: { cursor: "pointer" }, onClick: () => onSelect(pokemon) },
      React.createElement("td", null, pokemon.id),
      React.createElement("td", { className: "text-capitalize" }, pokemon.name),
      React.createElement("td", null, React.createElement("img", {
        src: pokemon.sprite,
        alt: pokemon.name,
        style: { height: 50 },
      }))
    );
  }

  return (
    <tr style={{ cursor: "pointer" }} onClick={() => onSelect(pokemon)}>
      <td>{pokemon.id}</td>
      <td className="text-capitalize">{pokemon.name}</td>
      <td>
        <img src={pokemon.sprite} alt={pokemon.name} style={{ height: 50 }} />
      </td>
    </tr>
  );
}
