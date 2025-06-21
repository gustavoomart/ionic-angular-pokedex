import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _storage: Storage | null = null;
  private storageKey = 'favoritePokemons';
  favoriteStatus: { [key: number]: boolean } = {};
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async getFavorites(): Promise<Pokemon[]> {
    await this._checkInit();
    const stored = await this._storage?.get(this.storageKey);
    return stored ? stored : [];
  }

  async addFavorite(pokemon: Pokemon): Promise<void> {
    await this._checkInit();
    const favorites = await this.getFavorites();
    if (!favorites.find(p => p.id === pokemon.id)) {
      favorites.push(pokemon);
      await this._storage?.set(this.storageKey, favorites);
    }
  }

  async removeFavorite(pokemonId: number): Promise<void> {
    await this._checkInit();
    const favorites = (await this.getFavorites()).filter(p => p.id !== pokemonId);
    await this._storage?.set(this.storageKey, favorites);
  }


  async loadFavoriteStatus(pokemons: Pokemon[]): Promise<void> {
    await this._checkInit();
    for (const pokemon of pokemons) {
      const isFav = await this.isFavorite(pokemon.id);
      this.favoriteStatus[pokemon.id] = isFav;
    }
  }

  async isFavorite(pokemonId: number): Promise<boolean> {
    await this._checkInit();
    const favorites = await this.getFavorites();
    return favorites.some(p => p.id === pokemonId);
  }

  async toggleFavorite(pokemon: Pokemon): Promise<void> {
    await this._checkInit();
    if (await this.isFavorite(pokemon.id)) {
      await this.removeFavorite(pokemon.id);
      this.favoriteStatus[pokemon.id] = false;
    } else {
      await this.addFavorite(pokemon);
      this.favoriteStatus[pokemon.id] = true;
    }
  }
  
  async _checkInit(): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
  }
}