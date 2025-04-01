import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { PokemonCard as PokemonCardType } from "../types/pokemon";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorDisplay } from "./ErrorDisplay";

interface PokemonCardProps {
  pokemon: PokemonCardType;
  isLoading?: boolean;
  error?: Error | null;
  onClick?: () => void;
}

const TYPE_COLORS: { [key: string]: string } = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export const PokemonCard = ({
  pokemon,
  isLoading,
  error,
  onClick,
}: PokemonCardProps) => {
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (isLoading) {
    return <LoadingSkeleton count={1} />;
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              transform: "scale(1.02)",
              transition: "transform 0.2s ease-in-out",
            }
          : {},
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={pokemon.imageUrl}
        alt={pokemon.name}
        sx={{ objectFit: "contain", p: 2, bgcolor: "#f5f5f5" }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textTransform: "capitalize" }}
        >
          {pokemon.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          {pokemon.types.map((type) => (
            <Chip
              key={type}
              label={type}
              size="small"
              sx={{
                bgcolor: TYPE_COLORS[type] || "#777",
                color: "white",
                textTransform: "capitalize",
              }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
