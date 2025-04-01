import { useQuery } from "@tanstack/react-query";
import { pokeApi } from "../../../services/pokeapi";
import type { Pokemon, PokemonDetails } from "../../../types/pokemon";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon", "list"],
    queryFn: async () => {
      const response = await pokeApi.get<{ results: Pokemon[] }>(
        "/pokemon?limit=151"
      );
      return response.results;
    },
  });
}

export function usePokemonDetails(name: string) {
  return useQuery({
    queryKey: ["pokemon", "details", name],
    queryFn: async () => {
      const response = await pokeApi.get<PokemonDetails>(`/pokemon/${name}`);
      return response;
    },
    enabled: !!name, // Only run the query if we have a name
  });
}
