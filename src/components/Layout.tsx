import { AppBar, Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

const routes = [
  { path: "/react-query", label: "React Query" },
  { path: "/rtk-query", label: "RTK Query" },
  { path: "/redux", label: "Redux" },
];

export const Layout = () => {
  const location = useLocation();
  const currentTab = routes.findIndex((route) =>
    location.pathname.startsWith(route.path)
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", alignItems: "center", py: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokémon State Management Demo
            </Typography>
          </Box>
          <Tabs
            value={currentTab !== -1 ? currentTab : 0}
            textColor="primary"
            indicatorColor="primary"
          >
            {routes.map((route, index) => (
              <Tab
                key={route.path}
                label={route.label}
                component={Link}
                to={route.path}
                value={index}
              />
            ))}
          </Tabs>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
