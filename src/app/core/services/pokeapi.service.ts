import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import { PokemonSpecie } from '../models/pokemon-specie.model';

@Injectable({
    providedIn: 'root'
})
export class PokeapiService {

    private apiUrl = 'https://pokeapi.co/api/v2';

    constructor(private http: HttpClient) { }

    getPokemon(nameOrId: string | number): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${nameOrId}`);
    }
    getPokemonSpecie(url: string): Observable<PokemonSpecie> {
        return this.http.get<PokemonSpecie>(url);
    }

    getPokemonsList(limit: number = 20, offset: number = 0): Observable<Pokemon[]> {
        return this.http.get<any>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`).pipe(
            switchMap(response => {
                const requests: Observable<Pokemon>[] = response.results.map((item: any) => this.getPokemon(item.name));
                return forkJoin(requests);
            })
        );
    }
    getTotalPages(limit: number = 20): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/pokemon?limit=1`).pipe(
      map(response => Math.ceil(response.count / limit))
    );
    
  }

}
