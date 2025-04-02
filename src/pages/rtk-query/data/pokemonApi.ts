import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PokemonListResponse,
  PokemonDetails,
  PokemonSpecies,
  EvolutionChain,
  PokemonListItem,
} from "../../../types/pokemon";
import { transformToCard, extractIdFromUrl } from "../../../services/pokeapi";

// Create the API slice
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  tagTypes: ["Pokemon", "Species", "Evolution"],
  endpoints: (builder) => ({
    // Get Pokemon list with transformed response
    getPokemonList: builder.query<PokemonListItem[], void>({
      query: () => ({
        url: "/pokemon",
        params: {
          limit: 151,
          offset: 0,
        },
      }),
      transformResponse: (response: PokemonListResponse) => {
        const pokemonWithIds = response.results.map((p) => ({
          ...p,
          id: extractIdFromUrl(p.url),
        }));

        return pokemonWithIds.map((p) => ({
          id: p.id,
          name: p.name,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
        }));
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Pokemon" as const, id })),
              { type: "Pokemon", id: "LIST" },
            ]
          : [{ type: "Pokemon", id: "LIST" }],
    }),

    // Get Pokemon details with transformed response
    getPokemonDetails: builder.query<
      ReturnType<typeof transformToCard>,
      string
    >({
      query: (name) => `/pokemon/${name}`,
      transformResponse: (response: PokemonDetails) =>
        transformToCard(response),
      providesTags: (result, error, name) => [{ type: "Pokemon", id: name }],
    }),

    // Get Pokemon species
    getPokemonSpecies: builder.query<PokemonSpecies, string>({
      query: (name) => `/pokemon-species/${name}`,
      providesTags: (result, error, name) => [{ type: "Species", id: name }],
    }),

    // Get evolution chain
    getEvolutionChain: builder.query<EvolutionChain, string>({
      query: (url) => url.replace("https://pokeapi.co/api/v2", ""),
      providesTags: (result, error, url) => [{ type: "Evolution", id: url }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetPokemonListQuery,
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
  useGetEvolutionChainQuery,
} = pokemonApi;
