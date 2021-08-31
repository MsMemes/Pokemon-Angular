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

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.pokemons = this.pokedexService.pokemons;
    this.pokedexService.getInitialsPoke();
    console.log(this.pokemons);
  }

}
