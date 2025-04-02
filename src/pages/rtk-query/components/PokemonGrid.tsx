import { Grid } from "@mui/material";
import { PokemonListItem } from "../../../types/pokemon";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import ErrorDisplay from "../../../components/ErrorDisplay";

interface PokemonGridProps {
  pokemon: PokemonListItem[];
  isLoading?: boolean;
  error?: Error | null;
  basePath: string;
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

  return (
    <Grid container spacing={2}>
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={`skeleton-${index}`}
            >
              <PokemonCard name="" showLoadingState={true} isLoading={true} />
            </Grid>
          ))
        : pokemon.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
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
