import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSpinnerComponent } from './payment-spinner.component';

describe('PaymentSpinnerComponent', () => {
  let component: PaymentSpinnerComponent;
  let fixture: ComponentFixture<PaymentSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
