import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.css']
})
export class PokemonViewComponent implements OnInit {

  pokemons!: Observable<Pokemon[]>;
  name!: string;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.pokemons = this.pokedexService.pokemons;
    this.pokedexService.getInitialsPoke();
    console.log(this.pokemons);
  }

  getPokemon(){
    this.pokemons = this.pokedexService.pokemons;
    this.pokedexService.getPokeByName(this.name);
    console.log('hi');
    console.log(this.name);
  }

}
