import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  private _pokemon: BehaviorSubject<Pokemon[]>;
  poke: Pokemon = new Pokemon;

  private dataStore: {
    pokemons: Pokemon[]
  }

  constructor(private http: HttpClient) {
    this.dataStore = { pokemons: [] };
    this._pokemon = new BehaviorSubject<Pokemon[]>([]);
  }

  get pokemons(): Observable<Pokemon[]> {
    return this._pokemon.asObservable();
  }

  getPokeByName(name: string) {
    const pokeUrl =  "https://pokeapi.co/api/v2/pokemon/" + name;

    return this.http.get<any>(pokeUrl)
    .subscribe(data => {
      this.poke.name = data.name;
      this.poke.id = data.id;
      this.poke.url = data.sprites.front_default;
      this.poke.shinyUrl = data.sprites.front_shiny;
      this._pokemon.next(Object.assign({}, this.dataStore).pokemons);
      this.dataStore.pokemons.push(this.poke);
    }, error => {
      console.log('Failed to fetch pokemons');
    });
  }

  //
}
