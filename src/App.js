import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.png';

import './App.css';
import PokemonCrossword from './components/PokemonCrossword/PokemonCrossword';

const useLocalStorage = (key, initialValue) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

const App = () => {
  const [difficulty, setDifficulty] = useLocalStorage('difficulty', 0);
  const client = new ApolloClient({
    uri: 'https://graphql-pokemon2.vercel.app',
  });
  return (
    <ApolloProvider client={client}>
        <ToastContainer autoClose={10000}/>
        <div className="App">
          <img src={logo} className="logo" alt="Pokemon Crossword" />
          <div className="difficulty-selector">
            <button onClick={() => setDifficulty(0)} className={difficulty === 0 ? 'selected' : ''}>Easy</button>
            <button onClick={() => setDifficulty(1)} className={difficulty === 1 ? 'selected' : ''}>Medium</button>
            <button onClick={() => setDifficulty(2)} className={difficulty === 2 ? 'selected' : ''}>Hard</button>
          </div>
          <PokemonCrossword difficulty={difficulty}/>
          <div className="footer">Made with <span role="img" aria-label="love">❤️</span> by <a href="https://github.com/acesmndr">acesmndr</a></div>
        </div>
    </ApolloProvider>
  );
}

export default App;
