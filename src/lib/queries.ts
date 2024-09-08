import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      image
      types
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      attacks{
      fast{
        name
        type
        damage
      }
      special{
        name
        type
        damage
      }
    }
    evolutions{
      id
      number
      name
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
    }
  }
`;

export const GET_POKEMONS = gql`
query pokemons($first: Int!){
    pokemons(first: $first){
      id
      number
      name
      classification
      types
      image
    }
  }
`;