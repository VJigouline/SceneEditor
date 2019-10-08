import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ThreeSceneService {
  scene: THREE.Scene;

  constructor(
// private http: HttpClient
  ) { }

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

  getSampleScene(): void {
// this.http.get<THREE.Scene>('assets/scenes/scene.json').subscribe( scene => this.scene = scene);
  }
}
