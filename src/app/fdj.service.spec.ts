import { TestBed } from '@angular/core/testing';

import { FdjService } from './fdj.service';

describe('FdjService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FdjService = TestBed.get(FdjService);
    expect(service).toBeTruthy();
  });
});
