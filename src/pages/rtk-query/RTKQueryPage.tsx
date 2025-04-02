import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { pokemonApi } from "./data/pokemonApi";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";

// Create store with RTK Query middleware
const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default function RTKQueryPage() {
  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<PokemonList />} />
        <Route path=":pokemonName" element={<PokemonDetail />} />
      </Routes>
    </Provider>
  );
}
