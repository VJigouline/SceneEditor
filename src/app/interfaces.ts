import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import * as THREE from 'three';

export interface DragEvent {
  object: THREE.Object3D;
  target: DragControls;
  type: string;
}
