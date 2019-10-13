import { MaterialLibrary } from './material-library';

describe('MaterialLibrary', () => {
  it('should create an instance', () => {
    expect(new MaterialLibrary('Add library name', 'Add library description')).toBeTruthy();
  });
});
