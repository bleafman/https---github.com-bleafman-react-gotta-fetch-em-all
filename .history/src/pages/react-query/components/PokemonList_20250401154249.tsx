import { Box, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PokemonGrid from "../../../components/PokemonGrid";
import ErrorDisplay from "../../../components/ErrorDisplay";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { usePokemonList } from "../hooks/usePokemon";
import { extractIdFromUrl } from "../../../services/pokeapi";
import type { PokemonCard } from "../../../types/pokemon";

export default function PokemonList() {
  const queryClient = useQueryClient();
  const { data: pokemonList, isLoading, isError, error } = usePokemonList();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorDisplay error={error} />;
  }

  const handleInvalidateCache = () => {
    // Invalidate all queries
    queryClient.invalidateQueries({ queryKey: ["pokemon"] });
  };

  // Transform the data into the format expected by PokemonGrid
  const pokemon: PokemonCard[] =
    pokemonList?.map((p) => ({
      id: extractIdFromUrl(p.url),
      name: p.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractIdFromUrl(
        p.url
      )}.png`,
      types: [], // Types will be loaded in the detail view
    })) || [];

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleInvalidateCache}
          sx={{ mb: 2 }}
        >
          Invalidate Cache
        </Button>
      </Box>
      <PokemonGrid pokemon={pokemon} basePath="/react-query" />
    </Box>
  );
}
