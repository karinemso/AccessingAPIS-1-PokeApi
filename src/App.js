import React, { useState, useEffect } from "react";
import styled from "styled-components";
import pokemons from "./pokemons";
const Aligned = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: black;
  color: white;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
function App() {
  const [pokemon, setPokemon] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [searched, setSearched] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  async function fetchData(e, searchedPokemon) {
    e.preventDefault();
    setPokemon("");
    let pokemon = searchedPokemon.toLowerCase();
    try {
      setSearched(false);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const data = await response.json();
      setPokemon([data]);
      setName(searchedPokemon);
    } catch (error) {
      console.log(error);
    } finally {
      setSearched(true);
    }
  }
  useEffect(() => {
  }, [pokemon]);
  return (
    <Aligned>
      <div className="pokebola">
        <div className="pokeTop">
          <h1>Catch a Pokemon</h1>
          <form onSubmit={(e) => fetchData(e, inputValue)}>
            <input
              type="text"
              minLength={3}
              maxLength={20}
              id="pokemonName"
              value={inputValue}
              onChange={handleInputChange}
              list="pokemonsList"
              placeholder="Pokemon's name"
            />
            <datalist id="pokemonsList">
              {pokemons.map((pokemon, index) => (
                <option key={index} value={pokemon} />
              ))}
            </datalist>

            <button type="submit" disabled={inputValue.length == 0}>
              Catch
            </button>
          </form>
        </div>
        {!pokemon.length > 0 && searched && (
          <>
            <div className="pokeBottom">
              {!pokemon[0] && <div className="pokemon"></div>}
              {!pokemon[0] && (
                <h2>Sadly, i think this pokemon does'nt exists...</h2>
              )}{" "}
            </div>
          </>
        )}
        {pokemon.length > 0 && searched && (
          <>
            <div className="pokeBottom">
              <div className="pokemon">
                <img
                  src={pokemon[0].sprites && pokemon[0].sprites.front_default}
                  alt={pokemon[0].name}
                />
              </div>
              <section className="pokeInfo">
                <div>
                  <h3>{name.toUpperCase()}</h3>
                </div>
                <div>
                  <h2>Habilities</h2>
                  <ul>
                    {pokemon[0].abilities &&
                      pokemon[0].abilities.map((ability) => (
                        <li key={ability.ability.name}>
                          {ability.ability.name}
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h2>Types</h2>
                  <ul>
                    {pokemon[0].types &&
                      pokemon[0].types.map((types) => (
                        <li key={types.type.name}>{types.type.name}</li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h2>Weight</h2>
                  <ul>
                    <li>{pokemon[0].weight}</li>
                  </ul>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </Aligned>
  );
}
export default App;
