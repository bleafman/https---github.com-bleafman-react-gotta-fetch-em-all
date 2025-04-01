import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonListResponse, PokemonDetails } from "../types/pokemon";
import { transformToCard } from "../services/pokeapi";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: ["Pokemon", "PokemonDetails"],
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => "pokemon?limit=151",
      providesTags: ["Pokemon"],
    }),
    getPokemonByName: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: (result, error, name) => [
        { type: "PokemonDetails", id: name },
      ],
      transformResponse: (response: PokemonDetails) => {
        return {
          ...response,
          ...transformToCard(response),
        };
      },
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi;
