import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShippingFormComponent } from './update-shipping-form.component';

describe('UpdateShippingFormComponent', () => {
  let component: UpdateShippingFormComponent;
  let fixture: ComponentFixture<UpdateShippingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateShippingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateShippingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
