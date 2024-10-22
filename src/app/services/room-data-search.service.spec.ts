import { TestBed } from '@angular/core/testing';

import { RoomDataSearchService } from './room-data-search.service';

describe('RoomDataSearchService', () => {
  let service: RoomDataSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomDataSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
