import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMONS } from '../../graphql/pokemons';
import Crossword from '@jaredreisinger/react-crossword';
import { generateCrossword } from 'crossword-gen';
import './pokemon-crossword.css';
import Loading from '../Loading/Loading';

const generateData = (inputPokemonsData = []) => {
  const inputData = inputPokemonsData.map(pokemon => ({ answer: pokemon.name, clue: pokemon.classification + 'some long string that will make the text overflow and the developer cry' }));
  const { across, down } = generateCrossword(inputData);
  const acrossData = across.reduce((acc, word, idx) => (
    Object.assign({}, acc, {
      [idx + 1]: word,
    })), {});
  const downData = down.reduce((acc, word, idx) => (
    Object.assign({}, acc, {
      [idx + 1]: word,
    })), {});
  return {
    across: acrossData,
    down: downData,
  }
}

const PokemonCrossword = () => {
  const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
      variables: { first: 151 },
  });
  if(!pokemons.length) {
    return <Loading />;
  }
  const crosswordData = generateData(pokemons.sort((a, b) => (0.5 - Math.random())).slice(0, 20));
  return (
    <div className="crossword-div">
      <Crossword
        data={crosswordData}
        useStorage={false}
        theme={{
          columnBreakpoint: '400px',
          gridBackground: 'transparent',
          cellBackground: '#ffe',
          cellBorder: '#fca',
          textColor: 'rgba(90,83,210,1)',
          numberColor: '#000',
          focusBackground: '#25c4de',
          highlightBackground: '#a2ffff',
        }}
      />
    </div>);
}

export default PokemonCrossword;
