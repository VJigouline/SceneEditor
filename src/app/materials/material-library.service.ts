import { Injectable } from '@angular/core';
import { Materials } from './materials';
import { MaterialLibrary } from './material-library';

@Injectable({
  providedIn: 'root'
})
export class MaterialLibraryService {

  private library: MaterialLibrary;
  public get Library(): MaterialLibrary {
    if (!this.library) { this.library = this.getDefaultLibrary(); }

    return this.library;
  }

  public get currentMaterials(): Materials {

    if (!this.Library) { return null; }

    if (0 <= this.library.current && this.library.current < this.library.materials.length) {
      return this.library.materials[this.library.current];
    }

    if (this.library.materials.length > 0) {
      this.library.current = 0;
      return this.library.materials[0];
    }

    return null;
  }

  constructor() { }

  public getDefaultLibrary(): MaterialLibrary {

    console.error('Not implemented.');
    return new MaterialLibrary();
  }

  public setCurrentMaterials(materials: Materials): void {
    const index = this.Library.materials.indexOf(materials);
    if (index > -1) { this.Library.current = index; }
  }

  public importLibrary(library: MaterialLibrary): void {
    if (this.library.materials.length === 0 ||
      this.library.materials.length === 1 && this.library.materials[0].materials.length === 0) {
      this.library = library;
      return;
    }

    for (const materials of library.materials) {
      this.library.materials.push(materials);
    }
  }
}
