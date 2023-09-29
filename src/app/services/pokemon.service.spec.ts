import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { of, lastValueFrom, throwError } from 'rxjs';

const error = new HttpErrorResponse({
  status: 404,
  error: 'batatinha',
});

const success = { batatinha: '' };

describe('PokemonService', () => {
  let service: PokemonService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpHandler,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call errorHandler if getPokemon returns a error', () => {
    spyOn(service, 'errorHandler').and.callThrough();
    httpClientSpy.get.and.returnValue(throwError(() => error));
    service.getPokemon(999);
    expect(service.errorHandler).toHaveBeenCalledOnceWith(error);
  });

  it('should not call errorHandler if getPokemon succeeds', () => {
    spyOn(service, 'errorHandler');
    httpClientSpy.get.and.returnValue(of(success));
    service.getPokemon(999);
    expect(service.errorHandler).not.toHaveBeenCalled();
  });

  it('should return a promise if getPokemon succeeds', async () => {
    httpClientSpy.get.and.returnValue(of(success));
    const resp = await service.getPokemon(999);
    expect(resp).toEqual(success);
  });

  it('should return a promise if getPokemon returns a error', async () => {
    httpClientSpy.get.and.returnValue(throwError(() => error));
    const errorText =
      `Error status: ${error.status}, ` + `body: ${error.error}`;
    const resp = await service.getPokemon(999);
    expect(resp).toEqual(new Error(errorText));
  });

  it('should log error from server and return a observable of it', async () => {
    spyOn(console, 'error');
    const errorText =
      `Error status: ${error.status}, ` + `body: ${error.error}`;
    const returned = await lastValueFrom(service.errorHandler(error));
    expect(console.error).toHaveBeenCalledOnceWith(errorText);
    expect(returned).toEqual(new Error(errorText));
  });
});
