import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { PokemonCardComponent } from './pokemon-card.component';

@Component({
  selector: 'app-pokemon-grid',
  template: `
    <ion-grid>
      <ion-row>
        <ion-col size="6" size-md="3" size-lg="1.5" *ngFor="let pokemon of pokemons">
          <app-pokemon-card
            [pokemon]="pokemon"
            [isFavorite]="getFavoriteStatus(pokemon)"
            (cardClick)="onCardClick($event)"
            (favoriteToggle)="onFavoriteToggle($event)">
          </app-pokemon-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
  standalone: true,
  imports: [
    CommonModule, IonGrid, IonRow, IonCol, PokemonCardComponent
  ]
})
export class PokemonGridComponent {
  @Input() pokemons: Pokemon[] = [];
  @Input() favoriteStatus: { [key: number]: boolean } = {};
  
  @Output() cardClick = new EventEmitter<Pokemon>();
  @Output() favoriteToggle = new EventEmitter<{ pokemon: Pokemon, event: Event }>();

  getFavoriteStatus(pokemon: Pokemon): boolean {
    return this.favoriteStatus[pokemon.id] || false;
  }

  onCardClick(pokemon: Pokemon) {
    this.cardClick.emit(pokemon);
  }

  onFavoriteToggle(data: { pokemon: Pokemon, event: Event }) {
    this.favoriteToggle.emit(data);
  }
}