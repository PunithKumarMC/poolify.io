import { TestBed } from '@angular/core/testing';

import { AudioListService } from './audio-list.service';

describe('AudioListService', () => {
  let service: AudioListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
