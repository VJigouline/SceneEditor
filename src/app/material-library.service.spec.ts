import { TestBed } from '@angular/core/testing';

import { MaterialLibraryService } from './material-library.service';

describe('MaterialLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialLibraryService = TestBed.get(MaterialLibraryService);
    expect(service).toBeTruthy();
  });
});
