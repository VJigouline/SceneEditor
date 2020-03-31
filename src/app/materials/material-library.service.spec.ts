import { TestBed } from '@angular/core/testing';

import { MaterialLibraryService } from './material-library.service';

describe('MaterialLibraryService', () => {
  let service: MaterialLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
