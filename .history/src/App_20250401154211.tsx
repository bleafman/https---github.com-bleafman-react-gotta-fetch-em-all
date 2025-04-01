import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ReactQueryPage from "./pages/react-query/ReactQueryPage";

// Placeholder pages - we'll implement these in their respective phases
const RtkQueryPage = () => <div>RTK Query Implementation (Coming Soon)</div>;
const ReduxPage = () => <div>Redux Implementation (Coming Soon)</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/react-query" replace />} />

          {/* React Query Routes */}
          <Route path="react-query/*" element={<ReactQueryPage />} />

          {/* RTK Query Routes */}
          <Route path="rtk-query/*" element={<RtkQueryPage />} />

          {/* Redux Routes */}
          <Route path="redux/*" element={<ReduxPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
