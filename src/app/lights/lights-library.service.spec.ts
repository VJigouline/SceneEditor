import { TestBed } from '@angular/core/testing';

import { LightsLibraryService } from './lights-library.service';

describe('LightsLibraryService', () => {
  let service: LightsLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightsLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
