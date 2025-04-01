import { Grid } from "@mui/material";
import { PokemonListItem } from "../types/pokemon";
import PokemonCard from "./PokemonCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorDisplay } from "./ErrorDisplay";
import { useNavigate } from "react-router-dom";

interface PokemonGridProps {
  pokemon: PokemonListItem[];
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
        <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <PokemonCard
            name={p.name}
            onClick={() => navigate(`${basePath}/${p.name}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonGrid;
