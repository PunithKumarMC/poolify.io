import { TestBed } from '@angular/core/testing';

import { RideNotificationService } from './ride-notification.service';

describe('RideNotificationService', () => {
  let service: RideNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
