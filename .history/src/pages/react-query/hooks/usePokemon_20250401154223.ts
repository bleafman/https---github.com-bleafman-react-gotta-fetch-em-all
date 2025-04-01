import { useQuery } from "@tanstack/react-query";
import { getPokemonList, getPokemonDetails } from "../../../services/pokeapi";
import type {
  PokemonListResponse,
  PokemonDetails,
} from "../../../types/pokemon";

export function usePokemonList() {
  return useQuery<PokemonListResponse["results"]>({
    queryKey: ["pokemon", "list"],
    queryFn: async () => {
      const response = await getPokemonList();
      return response.results;
    },
  });
}

export function usePokemonDetails(name: string) {
  return useQuery<PokemonDetails>({
    queryKey: ["pokemon", "details", name],
    queryFn: () => getPokemonDetails(name),
    enabled: !!name, // Only run the query if we have a name
  });
}
