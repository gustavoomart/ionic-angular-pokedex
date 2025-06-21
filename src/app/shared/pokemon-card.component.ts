import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton, IonCardTitle, IonCardHeader, IonImg, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { Pokemon } from 'src/app/core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  styles: [
    `
    .pokemon-card-container {
      position: relative;
    }
    .favorite-button {
      position: absolute;
      top: -18px;
      right: -6px;
      z-index: 10;
      --border-radius: 50%;
      width: 32px;
      height: 32px;
      
      &.favorited {
        --color: #ff0000;
      }
      
      ion-icon {
        font-size: 18px;
      }
    }
    ion-card-title {
      font-size: small;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    ion-img {
      height: 100px;
    }
    `
  ],
  template: `
    <div class="pokemon-card-container">
      <ion-card (click)="onCardClick()">
        <ion-card-content>
          <ion-img [src]="pokemon.sprites.other.showdown.front_default" [alt]="pokemon.name"></ion-img>
        </ion-card-content>
        <ion-card-header>
          <ion-card-title>{{ pokemon.name | uppercase }}</ion-card-title>
        </ion-card-header>
      </ion-card>
      
      <ion-button 
        class="favorite-button" 
        [class.favorited]="isFavorite"
        fill="clear"
        size="small"
        (click)="onFavoriteClick($event)">
        <ion-icon 
          slot="icon-only" 
          [name]="isFavorite ? 'heart' : 'heart-outline'">
        </ion-icon>
      </ion-button>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule, IonCard, IonCardContent, IonImg, IonCardHeader,
    IonCardTitle, IonButton, IonIcon
  ]
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  @Input() isFavorite: boolean = false;

  @Output() cardClick = new EventEmitter<Pokemon>();
  @Output() favoriteToggle = new EventEmitter<{ pokemon: Pokemon, event: Event }>();

  onCardClick() {
    this.cardClick.emit(this.pokemon);
  }

  onFavoriteClick(event: Event) {
    this.favoriteToggle.emit({ pokemon: this.pokemon, event });
  }
}