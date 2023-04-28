import { TestBed } from '@angular/core/testing';

import { PrintingGuard } from './printing.guard';

describe('PrintingGuard', () => {
  let guard: PrintingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrintingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
