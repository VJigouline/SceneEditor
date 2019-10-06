import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeSceneService {

  scene: THREE.Scene;

  constructor() { }

  getScene(): THREE.Scene {

    if (this.scene === undefined) {
      this.scene = new THREE.Scene();
    }

    return this.scene;
  }

  getNewScene(): THREE.Scene {

    this.scene = new THREE.Scene();

    return this.scene;
  }

  getSceneJSON(): string {
    if (this.scene === undefined) {
      return '';
    }

    return JSON.stringify(this.scene);
  }
}
