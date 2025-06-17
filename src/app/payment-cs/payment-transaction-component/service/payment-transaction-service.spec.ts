import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PaymentTransactionService } from './payment-transaction-service';

describe('PaymentTransactionService', () => {
  let service: PaymentTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PaymentTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
