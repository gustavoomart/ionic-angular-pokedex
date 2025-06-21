import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IonRow, IonIcon, IonButton, IonImg, IonCol, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent } from '@ionic/angular/standalone';
import { PokemonSpecie } from 'src/app/core/models/pokemon-specie.model';
import { Pokemon } from 'src/app/core/models/pokemon.model';
import { PokeapiService } from 'src/app/core/services/pokeapi.service';
import { CommonModule } from '@angular/common';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { KebabToTitlePipe } from 'src/app/pipes/kebab-to-title';

@Component({
    selector: 'pokemon-details',
    templateUrl: 'details.page.html',
    styleUrls: [
        'details.page.scss',
        '../../shared/progress-indicator.css'
    ],
    standalone: true,
    imports: [
        IonHeader, IonIcon, IonButton, IonToolbar, CommonModule,
        IonCol, IonButtons, IonBackButton, IonTitle, IonImg,
        IonContent, KebabToTitlePipe, IonRow
    ],
    providers: []
})
export class DetailsPage implements OnInit {
    pokemon!: Pokemon;
    sprites: string[] = [];
    isFavorite: boolean = false;
    currentIndex: number = 0;
    specieInfo: PokemonSpecie | null = null;
    flavourTexts: String[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private pokeapiService: PokeapiService,
        private favoritesService: FavoritesService) {
    }

    private loadPokemon() {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
            this.pokemon = navigation.extras.state['pokemon'];
            const other = this.pokemon.sprites.other;

            this.sprites = [
                ...Object.values(other['official-artwork']).filter((url): url is string => url !== null),
                ...Object.values(other.home).filter((url): url is string => url !== null),
                ...Object.values(other.dream_world).filter((url): url is string => url !== null)
            ];

        } else {
            this.router.navigate(['/home']);
        }
    }

    async ngOnInit() {
        this.loadPokemon();
        this.loadFlavorTexts();
        await this.loadIsFavorite();
    }

    

    private async loadIsFavorite() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.isFavorite = await this.favoritesService.isFavorite(id);
    }

    private loadFlavorTexts() {
        const lang = navigator.language;
        const specieUrl = this.pokemon.species.url;
        this.pokeapiService.getPokemonSpecie(specieUrl).subscribe((data: PokemonSpecie) => {
            this.specieInfo = data;
            let filtered = data.flavor_text_entries.filter(entry => entry.language.name === lang);

            if (filtered.length === 0) {
                filtered = data.flavor_text_entries.filter(entry => entry.language.name === 'en');
            }

            let filteredStrings = filtered.map(entry => entry.flavor_text.replace(/[\n\f\r]/g, ' ').trim());
            this.flavourTexts = [...new Set(filteredStrings)];
        });
    }

    nextImage() {
        if (this.sprites.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % this.sprites.length;
    }

    prevImage() {
        if (this.sprites.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + this.sprites.length) % this.sprites.length;
    }

    async toggleFavorite(event: Event) {
        event.stopPropagation();
        await this.favoritesService.toggleFavorite(this.pokemon);
        this.isFavorite = await this.favoritesService.isFavorite(this.pokemon.id);
    }
}