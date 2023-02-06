import { TestBed } from '@angular/core/testing';

import { InstaMojoService } from './insta-mojo.service';

describe('InstaMojoService', () => {
  let service: InstaMojoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstaMojoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
