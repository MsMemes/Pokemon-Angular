import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {

  pokemons!: Observable<Pokemon[]>;
  poke: Pokemon = new Pokemon;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.poke = this.pokedexService.poke;
    this.pokedexService.getPokeByName("charmander");

  }

}
