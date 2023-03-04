import { TestBed } from '@angular/core/testing';

import { ServiceActiveStatusGuard } from './service-active-status.guard';

describe('ServiceActiveStatusGuard', () => {
  let guard: ServiceActiveStatusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ServiceActiveStatusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
