import { TestBed } from '@angular/core/testing';

import { IncubationService } from './incubation.service';

describe('IncubationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncubationService = TestBed.get(IncubationService);
    expect(service).toBeTruthy();
  });
});
