import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartegoriesComponent } from './cartegories.component';

describe('CartegoriesComponent', () => {
  let component: CartegoriesComponent;
  let fixture: ComponentFixture<CartegoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartegoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartegoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
