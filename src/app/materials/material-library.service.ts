import { Injectable } from '@angular/core';
import { Materials } from './materials';
import { MaterialLibrary } from './material-library';
import DefaultLibrary from '../../assets/materials/default.json';

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

    // return new MaterialLibrary();
    const ret = DefaultLibrary as MaterialLibrary;
    const lib = new MaterialLibrary();
    ret.clone = lib.clone.bind(ret);
    if (ret.current === undefined) { ret.current = 0; }
    for (const ms of ret.materials) {
      for (const m of ms.materials) {
        m.visible = true;
      }
    }

    return ret.clone();
  }

  public setCurrentMaterials(materials: Materials): void {
    const index = this.Library.materials.indexOf(materials);
    if (index > -1) { this.Library.current = index; }
  }

  public importLibrary(library: MaterialLibrary): void {
    for (const ms of library.materials) {
      for (const m of ms.materials) {
        m.visible = true;
      }
    }
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
