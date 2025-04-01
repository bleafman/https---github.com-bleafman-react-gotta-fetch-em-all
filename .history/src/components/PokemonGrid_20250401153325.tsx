import { Grid } from "@mui/material";
import { PokemonCard as PokemonCardType } from "../types/pokemon";
import PokemonCard from "./PokemonCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorDisplay } from "./ErrorDisplay";
import { useNavigate } from "react-router-dom";

interface PokemonGridProps {
  pokemon: PokemonCardType[];
  isLoading?: boolean;
  error?: Error | null;
  basePath: string; // The base path for navigation (e.g., '/react-query', '/redux', etc.)
}

export const PokemonGrid = ({
  pokemon,
  isLoading,
  error,
  basePath,
}: PokemonGridProps) => {
  const navigate = useNavigate();

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (isLoading) {
    return <LoadingSkeleton count={12} />;
  }

  return (
    <Grid container spacing={2}>
      {pokemon.map((p) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
          <PokemonCard
            pokemon={p}
            onClick={() => navigate(`${basePath}/${p.name}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonGrid;
