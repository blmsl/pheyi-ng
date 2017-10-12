import { TestBed, inject } from '@angular/core/testing';

import { PaymentGatewayService } from './shared/services/payment-gateway.service';

describe('PaymentGatewayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentGatewayService]
    });
  });

  it('should be created', inject([PaymentGatewayService], (service: PaymentGatewayService) => {
    expect(service).toBeTruthy();
  }));
});
