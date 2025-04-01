import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Placeholder pages - we'll implement these in their respective phases
const ReactQueryPage = () => (
  <div>React Query Implementation (Coming Soon)</div>
);
const RtkQueryPage = () => <div>RTK Query Implementation (Coming Soon)</div>;
const ReduxPage = () => <div>Redux Implementation (Coming Soon)</div>;
const PokemonDetailPage = () => <div>Pokemon Detail Page</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/react-query" replace />} />

          {/* React Query Routes */}
          <Route path="react-query/*" element={<ReactQueryPage />} />
          <Route
            path="react-query/:pokemonName"
            element={<PokemonDetailPage />}
          />

          {/* RTK Query Routes */}
          <Route path="rtk-query/*" element={<RtkQueryPage />} />
          <Route
            path="rtk-query/:pokemonName"
            element={<PokemonDetailPage />}
          />

          {/* Redux Routes */}
          <Route path="redux/*" element={<ReduxPage />} />
          <Route path="redux/:pokemonName" element={<PokemonDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
