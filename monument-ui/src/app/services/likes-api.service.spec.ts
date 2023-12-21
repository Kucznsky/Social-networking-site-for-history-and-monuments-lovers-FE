import { TestBed } from '@angular/core/testing';

import { LikesApiService } from './likes-api.service';

describe('LikesApiService', () => {
  let service: LikesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
