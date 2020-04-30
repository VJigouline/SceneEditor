import { DragControls } from 'three/examples/jsm/controls/DragControls';

export interface DragEvent {
  object: THREE.Object3D;
  target: DragControls;
  type: string;
}
