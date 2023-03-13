import { TestBed } from '@angular/core/testing';

import { WalletServiceService } from './wallet-service.service';

describe('WalletServiceService', () => {
  let service: WalletServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
