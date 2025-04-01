import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from "react-router-dom";
import PokemonDetail from "./components/PokemonDetail";
import PokemonList from "./components/PokemonList";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      gcTime: 1000 * 60 * 60, // Unused data is garbage collected after 1 hour
      retry: 2, // Retry failed requests 2 times
    },
  },
});

export default function ReactQueryPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<PokemonList />} />
        <Route path=":pokemonName" element={<PokemonDetail />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
