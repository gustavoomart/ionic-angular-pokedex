import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { PokeapiService } from 'src/app/core/services/pokeapi.service';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { PokemonGridComponent } from 'src/app/shared/pokemon-grid.component';
import { Router } from '@angular/router';

@Component({
  selector: 'favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent,
    CommonModule, PokemonGridComponent
  ],
  providers: [PokeapiService]
})
export class FavoritesPage implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(
    private router: Router,
    public favoritesService: FavoritesService,
  ) { }

  async ngOnInit() {
    this.pokemons = await this.favoritesService.getFavorites();
    this.favoritesService.loadFavoriteStatus(this.pokemons);
  }

  onCardClick(pokemon: Pokemon) {
    this.router.navigate(['/details', pokemon.id], {
      state: { pokemon: pokemon }
    });
  }
  async onFavoriteToggle(data: { pokemon: Pokemon, event: Event }) {
    await this.favoritesService.toggleFavorite(data.pokemon);
    this.pokemons = this.pokemons.filter(p => p.id !== data.pokemon.id);
  }
}