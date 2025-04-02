import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import ErrorDisplay from "../../../components/ErrorDisplay";
import { useGetPokemonDetailsQuery } from "../data/pokemonApi";

interface PokemonCardProps {
  name: string;
  isLoading?: boolean;
  error?: Error | null;
  onClick?: () => void;
  showLoadingState?: boolean;
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

export default function PokemonCard({
  name,
  isLoading: isLoadingProp,
  error,
  onClick,
  showLoadingState = false,
}: PokemonCardProps) {
  const { data: pokemon, isLoading: isLoadingDetails } =
    useGetPokemonDetailsQuery(name, {
      // Skip the query if we're showing a loading state
      skip: !name || showLoadingState,
    });

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  const isCardLoading = (isLoadingProp || isLoadingDetails) && showLoadingState;

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
      {isCardLoading ? (
        <>
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{
              bgcolor: "#f5f5f5",
              p: 2,
            }}
          />
          <CardContent>
            <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={24} width="60%" />
          </CardContent>
        </>
      ) : pokemon ? (
        <>
          <CardMedia
            component="img"
            height={200}
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
        </>
      ) : null}
    </Card>
  );
}
