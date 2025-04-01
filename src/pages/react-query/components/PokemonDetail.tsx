import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { usePokemonDetails } from "../data/hooks/usePokemon";
import ErrorDisplay from "../../../components/ErrorDisplay";

export default function PokemonDetail() {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = usePokemonDetails(pokemonName || "");

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Skeleton variant="rectangular" width={200} height={200} />
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <Skeleton variant="text" width={200} height={40} />
              <Box sx={{ my: 2 }}>
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={100} />
              </Box>
              <Skeleton variant="text" width={150} />
              <Box sx={{ mb: 1 }}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} variant="text" width={120} />
                ))}
              </Box>
              <Skeleton variant="text" width={150} />
              <Box sx={{ mb: 1 }}>
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    variant="text"
                    width={100}
                    sx={{ mr: 1, display: "inline-block" }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
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
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              component="img"
              src={pokemon.imageUrl}
              alt={pokemon.name}
              sx={{ width: 200, height: "auto" }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ textTransform: "capitalize" }}
            >
              {pokemon.name}
            </Typography>
            <Box sx={{ my: 2 }}>
              {pokemon.types.map((type: string) => (
                <Chip
                  key={type}
                  label={type}
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
