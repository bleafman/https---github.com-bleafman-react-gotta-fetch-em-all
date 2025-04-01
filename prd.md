# Pokémon State Management Comparison App - PRD

## 1. Goal

To build a React application that demonstrates and compares three different approaches to fetching and managing server state using the public PokéAPI:

1.  **React Query:** Highlighting its caching, background refetching, and declarative data fetching capabilities.
2.  **RTK Query:** Showcasing Redux Toolkit's integrated data fetching and caching solution.
3.  **Manual Redux + Fetch:** Illustrating a more traditional approach using basic Redux state management combined with manual fetching in `useEffect`, mimicking a common pattern that often leads to redundant fetching and boilerplate.

The goal is to provide a clear, practical example for developers comparing these libraries, especially highlighting the benefits of dedicated server state libraries like React Query and RTK Query over manual implementations.

## 2. Key Features & Requirements

*   **Framework/Tooling:** React (Vite + TypeScript).
*   **UI:** Material UI (MUI) for components and styling. Minimal/functional styling is sufficient.
*   **Routing:** `react-router-dom` for navigation between the three example sections and detail views.
*   **API:** PokéAPI v2 (`https://pokeapi.co/api/v2/`).
*   **Core UI Components (Shared):**
    *   `PokemonCard`: Displays basic info (name, image, type). Shows skeleton loading state. Links to detail page.
    *   `PokemonGrid`: Displays a grid of `PokemonCard` components for the first 151 Pokémon. Shows overall list loading/error state.
    *   `PokemonDetail`: Displays more comprehensive details for a selected Pokémon:
        - Basic info (stats, abilities, etc.)
        - Evolution chain using nested API calls (species -> evolution chain)
        - Reuses `PokemonCard` components to display evolutions
        - Demonstrates React Query's caching when navigating between related Pokémon
        - Shows loading/error states for both main content and evolution chain
    *   `Layout`: Contains navigation (AppBar/Tabs) to switch between the three versions and renders the main content area.
    *   Loading/Error Components: Reusable MUI `Skeleton` components and simple error message displays/fallbacks.

*   **Three Independent Implementations:**
    Each implementation should be completely self-contained within its own directory to clearly demonstrate its unique characteristics:

    *   **/react-query/**
        - Uses `@tanstack/react-query`
        - Own instance of `QueryClientProvider`
        - Demonstrates efficient caching on navigation
        - Shows background refetching capabilities
        - Shows dependent queries (Pokemon -> Species -> Evolution Chain)
        - Demonstrates cache hits when navigating between related Pokémon
        - Cache invalidation button to demonstrate cache control

    *   **/rtk-query/**
        - Uses RTK Query (`@reduxjs/toolkit/query/react`)
        - Own Redux store and provider setup
        - Demonstrates tag-based cache invalidation
        - Shows automatic cache management
        - Cache bust button using tag invalidation

    *   **/redux/**
        - Uses plain Redux (`@reduxjs/toolkit`)
        - Own Redux store setup
        - Manual fetch implementations in `useEffect`
        - Shows typical refetching on mount behavior
        - Disabled cache bust button to highlight limitations

*   **Data Fetching:**
    *   Fetch initial list of 151 Pokémon (`/pokemon?limit=151`).
    *   Fetch individual Pokémon details (by name/URL) for cards and detail pages.
    *   Each implementation should handle these fetches in its characteristic way.

*   **State Representation:**
    *   Each implementation should clearly show its unique approach to:
        - Loading states (skeletons)
        - Error handling
        - Cache management
        - Data refetching
        - Component mount/unmount behavior

## 3. Technical Stack

*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Framework:** React 18+
*   **Routing:** `react-router-dom`
*   **State Management:**
    *   `@tanstack/react-query` (for React Query implementation)
    *   `@reduxjs/toolkit` (for RTK Query and Redux implementations)
    *   `react-redux` (for RTK Query and Redux implementations)
*   **UI Library:** `@mui/material`, `@emotion/react`, `@emotion/styled`
*   **HTTP Client:** `fetch` API or `axios`

## 4. Implementation Plan

### Phase 1: Project Setup & Shared Components

1.  **Initialize Project:** Create Vite project and install base dependencies
2.  **Shared Types:** Create Pokemon types and shared interfaces
3.  **Shared Components:** Create base UI components (Card, Grid, Layout)
4.  **API Utils:** Create base API utility functions
5.  **Routing:** Set up basic navigation structure

### Phase 2: React Query Implementation

1.  Create `/src/pages/react-query/` directory structure
2.  Set up React Query provider and configuration
3.  Implement list and detail pages using React Query hooks
4.  Add cache invalidation controls

### Phase 3: RTK Query Implementation

1.  Create `/src/pages/rtk-query/` directory structure
2.  Set up RTK Query store and API definitions
3.  Implement list and detail pages using generated hooks
4.  Add cache tag invalidation controls

### Phase 4: Redux Implementation

1.  Create `/src/pages/redux/` directory structure
2.  Set up Redux store, actions, and reducers
3.  Implement list and detail pages using `useEffect` and `useSelector`
4.  Add disabled cache controls with explanatory tooltip

### Phase 5: Refinement & Documentation

1.  Ensure consistent UI across implementations
2.  Add comments explaining key differences
3.  Create comprehensive README explaining the differences
4.  Add visual indicators of cache/loading behavior

## 5. Non-Goals

*   User authentication or accounts
*   Complex state mutations (e.g., "catching" Pokémon)
*   Offline support or persistence beyond session cache
*   Server-Side Rendering (SSR)
*   Unit/Integration tests (focus is on demonstrating concepts)

## 6. Key Differences to Highlight

*   **Code Organization:**
    - Each implementation should be isolated in its own directory
    - Providers should be scoped to their respective pages
    - No shared state between implementations
*   **Developer Experience:**
    - Amount of boilerplate code required
    - Ease of implementing features
    - Type safety and inference
*   **User Experience:**
    - Loading states and transitions
    - Cache hit/miss behavior
    - Navigation performance