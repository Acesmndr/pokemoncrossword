import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import logo from './logo.png';

import './App.css';
import PokemonCrossword from './components/PokemonCrossword/PokemonCrossword';

const App = () => {
  const [difficulty, setDifficulty] = React.useState(1); 
  const client = new ApolloClient({
    uri: 'https://graphql-pokemon2.vercel.app',
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <img src={logo} className="logo" alt="Pokemon Crossword" />
        <div className="difficulty-selector">
          <button onClick={() => setDifficulty(0)} className={difficulty === 0 ? 'selected' : ''}>Easy</button>
          <button onClick={() => setDifficulty(1)} className={difficulty === 1 ? 'selected' : ''}>Medium</button>
          <button onClick={() => setDifficulty(2)} className={difficulty === 2 ? 'selected' : ''}>Hard</button>
        </div>
        <PokemonCrossword difficulty={difficulty}/>
        <div className="footer">Made with ❤️ by <a href="https://github.com/acesmndr">acesmndr</a></div>
      </div>
    </ApolloProvider>
  );
}

export default App;
