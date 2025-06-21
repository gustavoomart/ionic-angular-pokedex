import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTitle, IonButtons, IonToolbar, IonHeader, IonInput, IonIcon, IonContent, IonButton } from '@ionic/angular/standalone';
import { PokeapiService } from 'src/app/core/services/pokeapi.service';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { RouterLink, Router } from '@angular/router';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { PokemonGridComponent } from 'src/app/shared/pokemon-grid.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonButtons, IonHeader, IonInput, IonToolbar, IonContent,
    IonIcon, IonButton, IonTitle, RouterLink, PokemonGridComponent
  ],
  providers: [PokeapiService]
})
export class HomePage implements OnInit {
  currentPage = 0;
  limit = 24;
  pokemons: Pokemon[] = [];
  totalPages = 0;

  constructor(
    private router: Router,
    private pokeapiService: PokeapiService,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.pokeapiService.getTotalPages(this.limit).subscribe(total => {
      this.totalPages = total;
      this.loadPokemonsPage(0);
    });
  }

  ionViewWillEnter() {
    if (this.pokemons.length > 0) {
      this.favoritesService.loadFavoriteStatus(this.pokemons);
    }
  }

  loadPokemonsPage(page: number) {
    const offset = page * this.limit;

    this.pokeapiService.getPokemonsList(this.limit, offset).subscribe((data: Pokemon[]) => {
      this.pokemons = data;
      this.currentPage = page;
      this.favoritesService.loadFavoriteStatus(this.pokemons);
    });
  }

  onPageInputChange(event: any) {
    const value = Number(event.detail.value);
    const targetPage = value - 1;
    if (!isNaN(targetPage) && targetPage >= 0 && targetPage < this.totalPages) {
      this.loadPokemonsPage(targetPage);
    }
  }

  onCardClick(pokemon: Pokemon) {
    this.router.navigate(['/details', pokemon.id], {
      state: { pokemon: pokemon }
    });
  }

  onFavoriteToggle(data: { pokemon: Pokemon, event: Event }) {
    this.favoritesService.toggleFavorite(data.pokemon);
  }
}