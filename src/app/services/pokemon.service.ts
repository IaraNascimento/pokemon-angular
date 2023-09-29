import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, of } from 'rxjs';
import { Pokemon } from '../components/hunt/hunt.component';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public path: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(public http: HttpClient) {}

  public getPokemon(pokemonNumber: number): Promise<Object | Error | Pokemon> {
    return lastValueFrom(
      this.http
        .get(this.path + pokemonNumber)
        .pipe(catchError((err) => this.errorHandler(err)))
    );
  }

  public errorHandler(error: HttpErrorResponse): Observable<Error> {
    const errorText =
      `Error status: ${error.status}, ` + `body: ${error.error}`;
    console.error(errorText);
    return of(new Error(errorText));
  }
}
