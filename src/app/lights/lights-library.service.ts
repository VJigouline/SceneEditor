import { Injectable } from '@angular/core';
import { LightsLibrary } from './lights-library';

@Injectable({
  providedIn: 'root'
})
export class LightsLibraryService {

  public library = new LightsLibrary();

  constructor() { }

}
