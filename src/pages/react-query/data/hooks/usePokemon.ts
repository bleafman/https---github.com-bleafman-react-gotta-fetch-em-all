import { useQuery } from "@tanstack/react-query";
import {
  getPokemonList,
  getPokemonDetails,
  transformToCard,
  extractIdFromUrl,
} from "../../../../services/pokeapi";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon", "list"],
    queryFn: async () => {
      const response = await getPokemonList();
      // Transform the basic list into a list of Pokemon with IDs
      const pokemonWithIds = response.results.map((p) => ({
        ...p,
        id: extractIdFromUrl(p.url),
      }));

      // Return transformed data with image URLs
      return pokemonWithIds.map((p) => ({
        id: p.id,
        name: p.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
      }));
    },
  });
}

export function usePokemonDetails(name: string) {
  return useQuery({
    queryKey: ["pokemon", "details", name],
    queryFn: async () => {
      const details = await getPokemonDetails(name);
      return transformToCard(details);
    },
    enabled: !!name, // Only run the query if we have a name
  });
}
