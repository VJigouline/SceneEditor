import { Material } from './material';
import * as THREE from 'three';

export class MaterialLibrary {
    name: string;
    description: string;
    materials: Material[] = [];

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    addFromScene(scene: THREE.Scene): void {
        for (const sc of scene.children) {
            for (const child of sc.children) {
              if (child.type === 'Mesh') {
                const mesh = child as THREE.Mesh;
                if (Array.isArray(mesh.material)) {
                  for (const mat of mesh.material) {
                    this.materials.push(Material.create(mat));
                  }
                } else {
                    this.materials.push(Material.create(mesh.material));
                }
              }
            }
        }
    }

    clone(): MaterialLibrary {
        const lib = new MaterialLibrary(this.name, this.description);
        for (const mat of this.materials) {
          const newMat = mat.clone();
          if (newMat === null) {
            continue;
          }
          lib.materials.push(newMat);
        }

        return lib;
    }
}
