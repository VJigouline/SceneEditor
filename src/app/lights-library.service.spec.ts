import { TestBed } from '@angular/core/testing';

import { LightsLibraryService } from './lights-library.service';

describe('LightsLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LightsLibraryService = TestBed.get(LightsLibraryService);
    expect(service).toBeTruthy();
  });
});
