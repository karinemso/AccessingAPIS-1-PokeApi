import React, { useState, useEffect } from "react";
import styled from "styled-components";


const Aligned= styled.div`
  display:flex;
  flex-direction: column;
  height: 100vh;
  background-color: red;
  align-items: center;
  justify-content:center;
  gap:10px;
`

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [ inputValue, setInputValue] = useState("");

  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
      const data = await response.json();
      setPokemon(data);
    }
    fetchData();
  }, [inputValue]);

  return (
    <Aligned>
    <h1>Digite o nome do seu pokemon favorito</h1>
    <h2>(Ou qualquer outro)</h2>
    <input type="text" id="pokemonName" value={inputValue} onChange={handleInputChange} />
    <h2>Nome:</h2>
    <h3>{inputValue.toUpperCase()}</h3>
    <img src={pokemon.sprites && pokemon.sprites.front_default} alt={pokemon.name} />
    <h2>Habilidades</h2>
    <ul>
      {pokemon && pokemon.abilities && pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
    </ul>
    <h2>Tipo:</h2>
    <h3>{pokemon && pokemon.types && pokemon.types.map((types) => (
          <p key={types.type.name}>{types.type.name}</p>
        ))}</h3>
    <h2>Peso:</h2>
    <h3>{pokemon.weight}</h3>


    </Aligned>
    
  );
}

export default App;
