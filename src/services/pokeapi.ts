import {
  PokemonListResponse,
  PokemonDetails,
  PokemonSpecies,
  EvolutionChain,
} from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Fetches a list of Pokemon with optional limit and offset
 * @param limit Number of Pokemon to fetch (default: 151 - Gen 1)
 * @param offset Starting position (default: 0)
 */
export const getPokemonList = async (
  limit: number = 151,
  offset: number = 0
): Promise<PokemonListResponse> => {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  return response.json();
};

/**
 * Fetches detailed information about a specific Pokemon
 * @param nameOrId The name or ID of the Pokemon
 */
export const getPokemonDetails = async (
  nameOrId: string | number
): Promise<PokemonDetails> => {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch details for Pokemon: ${nameOrId}`);
  }

  return response.json();
};

/**
 * Helper function to extract Pokemon ID from its URL
 * @param url The Pokemon's URL from the list endpoint
 */
export const extractIdFromUrl = (url: string): number => {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};

/**
 * Helper function to transform Pokemon details into card format
 * @param details Full Pokemon details from the API
 */
export const transformToCard = (details: PokemonDetails) => ({
  id: details.id,
  name: details.name,
  imageUrl:
    details.sprites.other["official-artwork"].front_default ||
    details.sprites.front_default,
  types: details.types.map((t) => t.type.name),
  stats: details.stats.map((s) => ({
    base_stat: s.base_stat,
    stat: {
      name: s.stat.name,
    },
  })),
  abilities: details.abilities.map((a) => ({
    ability: {
      name: a.ability.name,
    },
  })),
});

/**
 * Fetches Pokemon species information
 * @param nameOrId The name or ID of the Pokemon
 */
export const getPokemonSpecies = async (
  nameOrId: string | number
): Promise<PokemonSpecies> => {
  const response = await fetch(
    `${BASE_URL}/pokemon-species/${nameOrId.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch species for Pokemon: ${nameOrId}`);
  }

  return response.json();
};

/**
 * Fetches evolution chain data
 * @param url The full URL to the evolution chain
 */
export const getEvolutionChain = async (
  url: string
): Promise<EvolutionChain> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch evolution chain");
  }

  return response.json();
};
