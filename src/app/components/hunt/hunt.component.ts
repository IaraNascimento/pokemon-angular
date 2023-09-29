import { Component } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

export interface Pokemon {
  sprites?: {
    front_default?: string;
  };
}

@Component({
  selector: 'app-hunt',
  templateUrl: './hunt.component.html',
  styleUrls: ['./hunt.component.scss'],
})
export class HuntComponent {
  public captured: Array<Pokemon> = [];
  public pokemon: undefined | Pokemon = undefined;
  public ableToCapture: boolean = false;

  constructor(public pokemonService: PokemonService) {}

  public randonNumber(): number {
    return Math.floor(Math.random() * 151) + 1;
  }

  public async huntPokemon(): Promise<void> {
    const response = (await this.pokemonService.getPokemon(
      this.randonNumber()
    )) as Pokemon;
    if (response.sprites?.front_default) {
      this.pokemon = response;
      this.ableToCapture = this.toggleAbleToCapture(
        this.captured,
        this.pokemon
      );
    }
  }

  public capture(pokemon: Pokemon | undefined): void {
    if (pokemon?.sprites?.front_default) {
      this.captured.push(pokemon);
      this.ableToCapture = this.toggleAbleToCapture(
        this.captured,
        this.pokemon
      );
    }
  }

  public toggleAbleToCapture(
    pokemonList: Array<Pokemon>,
    currentPokemon: undefined | Pokemon
  ): boolean {
    if (typeof currentPokemon === 'undefined') {
      return false;
    }
    return !pokemonList.some(
      (p) => p.sprites?.front_default === currentPokemon.sprites?.front_default
    );
  }
}
