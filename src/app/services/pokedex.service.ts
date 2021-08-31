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
  chari: Pokemon = new Pokemon;
  bulba: Pokemon = new Pokemon;
  squirtle: Pokemon = new Pokemon;

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

  getInitialsPoke() {
    const charUrl =  "https://pokeapi.co/api/v2/pokemon/charmander";
    const bulbaUrl =  "https://pokeapi.co/api/v2/pokemon/bulbasaur";
    const squiUrl =  "https://pokeapi.co/api/v2/pokemon/squirtle";

    this.http.get<any>(bulbaUrl)
    .subscribe(data => {
      this.bulba.name = data.name;
      this.bulba.id = data.id;
      this.bulba.url = data.sprites.front_default;
      this.bulba.shinyUrl = data.sprites.front_shiny;
      this._pokemon.next(Object.assign({}, this.dataStore).pokemons);
      this.dataStore.pokemons.push(this.bulba);
    }, error => {
      console.log('Failed to fetch pokemons');
    });

    this.http.get<any>(charUrl)
    .subscribe(data => {
      this.chari.name = data.name;
      this.chari.id = data.id;
      this.chari.url = data.sprites.front_default;
      this.chari.shinyUrl = data.sprites.front_shiny;
      this._pokemon.next(Object.assign({}, this.dataStore).pokemons);
      this.dataStore.pokemons.push(this.chari);
    }, error => {
      console.log('Failed to fetch pokemons');
    });

    this.http.get<any>(squiUrl)
    .subscribe(data => {
      this.squirtle.name = data.name;
      this.squirtle.id = data.id;
      this.squirtle.url = data.sprites.front_default;
      this.squirtle.shinyUrl = data.sprites.front_shiny;
      this._pokemon.next(Object.assign({}, this.dataStore).pokemons);
      this.dataStore.pokemons.push(this.squirtle);
    }, error => {
      console.log('Failed to fetch pokemons');
    });
  }

  //
}
