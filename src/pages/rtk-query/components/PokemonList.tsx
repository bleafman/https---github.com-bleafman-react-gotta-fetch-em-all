import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import PokemonGrid from "./PokemonGrid";
import ErrorDisplay from "../../../components/ErrorDisplay";
import { pokemonApi, useGetPokemonListQuery } from "../data/pokemonApi";

export default function PokemonList() {
  const dispatch = useDispatch();
  const { data: pokemon, isLoading, isError, error } = useGetPokemonListQuery();

  const handleInvalidateCache = () => {
    // Invalidate all Pokemon-related cache
    dispatch(pokemonApi.util.invalidateTags(["Pokemon"]));
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
        <ErrorDisplay error={error as Error} />
      ) : (
        <PokemonGrid
          pokemon={pokemon || []}
          basePath="/rtk-query"
          isLoading={isLoading}
        />
      )}
    </Box>
  );
}
