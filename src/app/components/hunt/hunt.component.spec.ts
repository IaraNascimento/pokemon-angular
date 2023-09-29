import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HuntComponent } from './hunt.component';
import { ButtonComponent } from '../button/button.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('HuntComponent', () => {
  let component: HuntComponent;
  let fixture: ComponentFixture<HuntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuntComponent, ButtonComponent],
      providers: [HttpHandler, HttpClient, PokemonService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(HuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
