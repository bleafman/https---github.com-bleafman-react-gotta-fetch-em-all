import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { Grid } from "@mui/material";
import { usePokemonDetails } from "../hooks/usePokemon";
import ErrorDisplay from "../../../components/ErrorDisplay";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import type { PokemonDetails } from "../../../types/pokemon";

export default function PokemonDetail() {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = usePokemonDetails(pokemonName || "");

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <ErrorDisplay error={error} />;
  }

  if (!pokemon) {
    return <Typography>No Pokémon found</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid component="div" item xs={12} md={4}>
            <Box
              component="img"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              sx={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid component="div" item xs={12} md={8}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textTransform: "capitalize" }}
            >
              {pokemon.name}
            </Typography>
            <Box sx={{ my: 2 }}>
              {pokemon.types.map((type) => (
                <Chip
                  key={type.type.name}
                  label={type.type.name}
                  sx={{ mr: 1, textTransform: "capitalize" }}
                />
              ))}
            </Box>
            <Typography variant="h6">Stats</Typography>
            {pokemon.stats.map((stat) => (
              <Box key={stat.stat.name} sx={{ mb: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}
                >
                  {stat.stat.name}: {stat.base_stat}
                </Typography>
              </Box>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Abilities
            </Typography>
            {pokemon.abilities.map((ability) => (
              <Chip
                key={ability.ability.name}
                label={ability.ability.name}
                sx={{ mr: 1, mb: 1, textTransform: "capitalize" }}
              />
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
