import gql from 'graphql-tag';

export const GET_POKEMONS = gql`
    query pokemons($first: Int!) {
        pokemons(first: $first) {
            name
            types
            image
            classification
        }   
    }
`;
