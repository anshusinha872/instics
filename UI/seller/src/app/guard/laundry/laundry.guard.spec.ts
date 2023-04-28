import { TestBed } from '@angular/core/testing';

import { LaundryGuard } from './laundry.guard';

describe('LaundryGuard', () => {
  let guard: LaundryGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LaundryGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
