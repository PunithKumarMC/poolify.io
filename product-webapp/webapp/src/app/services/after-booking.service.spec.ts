import { TestBed } from '@angular/core/testing';

import { AfterBookingService } from './after-booking.service';

describe('AfterBookingService', () => {
  let service: AfterBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfterBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
