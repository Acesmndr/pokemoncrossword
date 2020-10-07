import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMONS } from '../../graphql/pokemons';
import Crossword from '@jaredreisinger/react-crossword';
import { generateCrossword } from 'crossword-gen';
import './pokemon-crossword.css';
import Loading from '../Loading/Loading';

const pokemonTypeString = (types = []) => {
  if(types.length > 1) {
    const typeString = types.join(', ');
    const lastCommaIndex = typeString.lastIndexOf(',');
    return `${typeString.substr(0, lastCommaIndex)} and ${typeString.substr(lastCommaIndex + 1)}`;
  }
  return types[0];
}

const generateClueBasedOnDifficulty = (pokemon = {}, difficulty = 0) => {
  const { classification, types } = pokemon;
  switch(difficulty) {
    case 0:
      return `${pokemonTypeString(types)} type ${classification}`;
    case 1:
      return classification;
    case 2:
    default:
      return `${pokemonTypeString(types)} type`;
  }
}

const generateData = (inputPokemonsData = [], difficulty) => {
  const sortedAndTrimmedPokemonData = inputPokemonsData.sort((a, b) => (0.5 - Math.random())).slice(0, (5 + 3 * (difficulty + 1)));
  const validPokemonFromSortedList = sortedAndTrimmedPokemonData.filter(pokemon => /[a-zA-Z]/.test(pokemon.name));
  const inputData = validPokemonFromSortedList.map(pokemon => ({
    answer: pokemon.name,
    clue: generateClueBasedOnDifficulty(pokemon, difficulty),
  }));
  const { across = [], down = [] } = generateCrossword(inputData);
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

const PokemonCrossword = ({ difficulty }) => {
  const { data: { pokemons = [] } = {} } = useQuery(GET_POKEMONS, {
      variables: { first: 151 },
  });
  if(!pokemons.length) {
    return <Loading />;
  }
  const crosswordData = generateData(pokemons, difficulty);
  return (
    <div className="crossword-div">
      <Crossword
        data={crosswordData}
        useStorage={false}
        theme={{
          columnBreakpoint: '600px',
          gridBackground: 'transparent',
          cellBackground: '#ffe',
          cellBorder: '#fca',
          textColor: '#212121',
          numberColor: '#000',
          focusBackground: '#4f97dd',
          highlightBackground: '#89b2db',
        }}
        onCorrect={(direction, number, answer) => console.log(direction, number, answer)}
        onCrosswordCorrect={(completed) => {console.log('completed', completed)}}
      />
    </div>);
}

export default PokemonCrossword;
