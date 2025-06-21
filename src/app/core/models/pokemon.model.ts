export interface Pokemon {
  id: number;
  species: {
    "url": "https://pokeapi.co/api/v2/pokemon-species/211/"
  };
  name: string;
  sprites: {
    other: {
      showdown: {
        front_default: string | null;
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      home: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      dream_world: {
        front_default: string | null;
        front_female: string | null;
      }
      'official-artwork': {
        front_default: string | null;
        front_shiny: string | null;
      };
      
    };
  };
}
