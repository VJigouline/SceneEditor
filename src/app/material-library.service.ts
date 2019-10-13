import { Injectable } from '@angular/core';
import { MaterialLibrary } from './material-library';
import { Material } from './material';

@Injectable({
  providedIn: 'root'
})
export class MaterialLibraryService {

  libraries: MaterialLibrary[];
  currentIndex = 0;

  constructor() { }

  addLibrary(library: MaterialLibrary): void {
    this.libraries.push(library);
  }

  selectLibrary(index: number): void {
    if (index < 0 || index >= this.libraries.length) {
      console.error('Invalid library index.');
    } else {
      this.currentIndex = index;
    }
  }

  getNames(): MaterialLibrary[] {
    const ret: MaterialLibrary[] = [];

    for (const lib of this.libraries) {
      ret.push(new MaterialLibrary(lib.name, lib.description));
    }

    return ret;
  }

  getCurrentLibrary(): MaterialLibrary {
    if (0 <= this.currentIndex && this.currentIndex < this.libraries.length) {
      return this.libraries[this.currentIndex];
    }

    return null;
  }

  addNewLibrary(name: string, description: string): void {
    this.libraries.push(new MaterialLibrary(name, description));
  }

  addLibraryClone(library: MaterialLibrary): void {
    if (library === undefined) {
      console.error('Undefined library.');
      return;
    }
    this.libraries.push(library.clone());
  }
}
