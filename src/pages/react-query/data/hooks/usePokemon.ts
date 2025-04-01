import { useQuery } from "@tanstack/react-query";
import {
  getPokemonList,
  getPokemonDetails,
  getPokemonSpecies,
  getEvolutionChain,
  transformToCard,
  extractIdFromUrl,
} from "../../../../services/pokeapi";
import { EvolutionChain } from "../../../../types/pokemon";

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

export function usePokemonSpecies(name: string) {
  return useQuery({
    queryKey: ["pokemon", "species", name],
    queryFn: () => getPokemonSpecies(name),
    enabled: !!name,
  });
}

export function useEvolutionChain(evolutionChainUrl: string | undefined) {
  return useQuery({
    queryKey: ["pokemon", "evolution", evolutionChainUrl],
    queryFn: () => getEvolutionChain(evolutionChainUrl!),
    enabled: !!evolutionChainUrl,
  });
}

// Helper function to extract all evolution names from the chain
export function extractEvolutionNames(
  chain: EvolutionChain["chain"]
): string[] {
  const names: string[] = [chain.species.name];

  chain.evolves_to.forEach(
    (evolution: EvolutionChain["chain"]["evolves_to"][0]) => {
      names.push(evolution.species.name);
      evolution.evolves_to.forEach(
        (
          furtherEvolution: EvolutionChain["chain"]["evolves_to"][0]["evolves_to"][0]
        ) => {
          names.push(furtherEvolution.species.name);
        }
      );
    }
  );

  return names;
}
