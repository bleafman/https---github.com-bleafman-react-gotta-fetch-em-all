// Types based on PokeAPI responses
// https://pokeapi.co/api/v2/pokemon and https://pokeapi.co/api/v2/pokemon/{id}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

// Basic Pokemon type for list view
export interface PokemonListItem {
  id: number;
  name: string;
  imageUrl: string;
}

// Full Pokemon details from the API
export interface PokemonDetails {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}

// Loading states for components
export interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

// Combined state types for Redux
export interface PokemonState {
  list: {
    data: PokemonListResponse | null;
  } & LoadingState;
  details: {
    [key: string]: {
      data: PokemonDetails | null;
    } & LoadingState;
  };
}

export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
}

export interface EvolutionChain {
  id: number;
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to: {
      species: {
        name: string;
        url: string;
      };
      evolves_to: {
        species: {
          name: string;
          url: string;
        };
      }[];
    }[];
  };
}
