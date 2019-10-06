import { TestBed } from '@angular/core/testing';

import { ThreeSceneService } from './three-scene.service';

describe('ThreeSceneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThreeSceneService = TestBed.get(ThreeSceneService);
    expect(service).toBeTruthy();
  });
});
