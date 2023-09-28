import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HuntComponent } from './components/hunt/hunt.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HuntComponent],
    });
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
