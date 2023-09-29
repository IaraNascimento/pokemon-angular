import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HuntComponent } from './hunt.component';
import { ButtonComponent } from '../button/button.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { throwError } from 'rxjs';

const pokemonMock = {
  sprites: {
    front_default: 'string',
  },
};

describe('HuntComponent', () => {
  let component: HuntComponent;
  let fixture: ComponentFixture<HuntComponent>;
  const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', [
    'getPokemon',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuntComponent, ButtonComponent],
      providers: [
        HttpHandler,
        HttpClient,
        { provide: PokemonService, useValue: pokemonServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(HuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('huntPokemon should populate pokemon if service returns success', fakeAsync(() => {
    pokemonServiceSpy.getPokemon.and.returnValue(pokemonMock);
    expect(component.pokemon).toBeUndefined();
    component.huntPokemon();
    tick();
    expect(component.pokemon).not.toBeUndefined();
  }));

  it('huntPokemon should not populate pokemon if service returns error', fakeAsync(() => {
    pokemonServiceSpy.getPokemon.and.returnValue(throwError(() => {}));
    expect(component.pokemon).toBeUndefined();
    component.huntPokemon();
    tick();
    expect(component.pokemon).toBeUndefined();
  }));

  it('huntPokemon should populate ableToCapture if service returns success', fakeAsync(() => {
    pokemonServiceSpy.getPokemon.and.returnValue(pokemonMock);
    component.ableToCapture = false;
    expect(component.ableToCapture).toBeFalse();
    component.huntPokemon();
    tick();
    expect(component.ableToCapture).toBeTrue();
  }));

  it('huntPokemon should not populate ableToCapture if service returns error', fakeAsync(() => {
    pokemonServiceSpy.getPokemon.and.returnValue(throwError(() => {}));
    component.ableToCapture = false;
    expect(component.ableToCapture).toBeFalse();
    component.huntPokemon();
    tick();
    expect(component.ableToCapture).toBeFalse();
  }));

  it('capture should add pokemon on list if there is a valid pokemon', () => {
    expect(component.captured).toEqual([]);
    component.capture(pokemonMock);
    expect(component.captured).toEqual([pokemonMock]);
  });

  it('capture should not add pokemon on list if pokemon dont have sprite', () => {
    expect(component.captured).toEqual([]);
    component.capture({});
    expect(component.captured).toEqual([]);
  });

  it('capture should populate ableToCapture with false if there is a valid pokemon', () => {
    component.ableToCapture = true;
    expect(component.ableToCapture).toBeTrue();
    component.capture(pokemonMock);
    expect(component.ableToCapture).toBeFalse();
  });

  it('capture should not populate ableToCapture if pokemon dont have sprite', () => {
    component.ableToCapture = true;
    expect(component.ableToCapture).toBeTrue();
    component.capture({});
    expect(component.ableToCapture).toBeTrue();
  });

  it('toggleAbleToCapture should return false if dont have a current pokemon', () => {
    expect(component.toggleAbleToCapture([], undefined)).toBeFalse();
  });

  it('toggleAbleToCapture should return false if found the pokemon on list', () => {
    expect(
      component.toggleAbleToCapture([pokemonMock], pokemonMock)
    ).toBeFalse();
  });

  it('toggleAbleToCapture should return true if dont find the pokemon on list', () => {
    expect(component.toggleAbleToCapture([], pokemonMock)).toBeTrue();
  });
});
