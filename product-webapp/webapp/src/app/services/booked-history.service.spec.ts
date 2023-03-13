import { TestBed } from '@angular/core/testing';

import { BookedHistoryService } from './booked-history.service';

describe('BookedHistoryService', () => {
  let service: BookedHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
