import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Skeleton,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  useGetPokemonDetailsQuery,
  useGetPokemonSpeciesQuery,
  useGetEvolutionChainQuery,
} from "../data/pokemonApi";
import { extractEvolutionNames } from "../../../pages/react-query/data/hooks/usePokemon";
import ErrorDisplay from "../../../components/ErrorDisplay";
import PokemonCard from "./PokemonCard";

export default function PokemonDetail() {
  console.log("[RTK Query] PokemonDetail rendering", new Date().getTime());
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const navigate = useNavigate();

  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useGetPokemonDetailsQuery(pokemonName || "");

  // Fetch species data which contains evolution chain URL
  const { data: species } = useGetPokemonSpeciesQuery(pokemonName || "");

  // Fetch evolution chain data
  const { data: evolutionChain } = useGetEvolutionChainQuery(
    species?.evolution_chain.url || "",
    {
      skip: !species?.evolution_chain.url,
    }
  );

  console.log("[RTK Query] Data state:", {
    pokemonName,
    hasData: !!pokemon,
    isLoading,
    hasSpecies: !!species,
    hasEvolutionChain: !!evolutionChain,
  });

  // Extract evolution names when chain is available
  const evolutionNames = evolutionChain
    ? extractEvolutionNames(evolutionChain.chain)
    : [];

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
    return <ErrorDisplay error={error as Error} />;
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

            {evolutionNames.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Evolution Chain
                </Typography>
                <Grid container spacing={2}>
                  {evolutionNames.map((name) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={name}>
                      <PokemonCard
                        name={name}
                        onClick={() => {
                          navigate(`/rtk-query/${name}`);
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
