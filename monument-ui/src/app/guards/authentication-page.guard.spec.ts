import { TestBed } from '@angular/core/testing';

import { AuthenticationPageGuard } from './authentication-page.guard';

describe('AuthenticationPageGuard', () => {
  let guard: AuthenticationPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
