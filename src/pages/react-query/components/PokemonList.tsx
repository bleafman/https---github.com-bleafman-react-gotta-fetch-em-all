import { Box, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import PokemonGrid from "../../../components/PokemonGrid";
import ErrorDisplay from "../../../components/ErrorDisplay";
import { usePokemonList } from "../data/hooks/usePokemon";

export default function PokemonList() {
  const queryClient = useQueryClient();
  const { data: pokemon, isLoading, isError, error } = usePokemonList();

  const handleInvalidateCache = () => {
    // Invalidate all queries
    queryClient.invalidateQueries({ queryKey: ["pokemon"] });
  };

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
      {isError ? (
        <ErrorDisplay error={error} />
      ) : (
        <PokemonGrid
          pokemon={pokemon || []}
          basePath="/react-query"
          isLoading={isLoading}
        />
      )}
    </Box>
  );
}
