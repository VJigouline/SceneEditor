import { TestBed } from '@angular/core/testing';

import { LightService } from './light.service';

describe('LightService', () => {
  let service: LightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
