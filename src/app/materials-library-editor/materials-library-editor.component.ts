import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Material } from '../materials/material';
import { Materials } from '../materials/materials';
import { MaterialLibraryService } from '../materials/material-library.service';
import { ThreeSceneService } from '../three-scene.service';
import { saveAs } from 'file-saver';
import { MatSelectChange } from '@angular/material/select';
import { MaterialLibrary } from '../materials/material-library';
import { MaterialEditorComponent } from '../material-editor/material-editor.component';
import { ConfirmationDialogComponent } from '../user-controls/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../user-controls/error-dialog/error-dialog.component';
import { DragControls, DragEvent } from 'three/examples/jsm/controls/DragControls';
import { MatCheckboxChange } from '@angular/material/checkbox';

import * as THREE from 'three';
import { MaterialPreviewComponent } from '../materials/material-preview/material-preview.component';
import { ResizedEvent } from 'angular-resize-event';

interface UVs {
  uv0: THREE.Vector2;
  uv1: THREE.Vector2;
  uv2: THREE.Vector2;
}

@Component({
  selector: 'app-materials-library-editor',
  templateUrl: './materials-library-editor.component.html',
  styleUrls: ['./materials-library-editor.component.scss']
})

export class MaterialsLibraryEditorComponent implements OnInit {

  // events
  @Output() changedMaterial = new EventEmitter<Material>();

  // properties
  public get Library(): MaterialLibrary {
    return this.libraryService.Library;
  }
  public Materials: Materials;
  public Material: Material;
  public get deleteDisabled(): boolean {
    return this.libraryService.Library.current < 0 ||
      this.libraryService.Library.current >= this.libraryService.Library.materials.length;
  }
  public assignMaterial = false;
  private dragControl: DragControls;
  private selectedObject: THREE.Object3D;
  private highlightedObject: THREE.Object3D;
  private selectedObjectMaterial: THREE.Material | THREE.Material[];
  private highlightedObjectMaterial: THREE.Material | THREE.Material[];
  private selectedMaterial: THREE.Material;
  private highlightedMaterial: THREE.Material;
  private doHighlighting = true;
  private updateDragControl = true;
  private activeTab = false;
  private dialogRaised = false;

  @ViewChild('MaterialEditor')
  private materialEditor: MaterialEditorComponent;
  @ViewChild('MaterialPreview')
  private materialPreview: MaterialPreviewComponent;

  constructor(
    private libraryService: MaterialLibraryService,
    private confirmationDialog: MatDialog,
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.Materials = this.libraryService.currentMaterials;
    this.Material = this.Materials.materials[0];
    this.highlightedMaterial = new THREE.MeshStandardMaterial( {
      color: '#ff00ff', metalness: 1, roughness: 0.5, name: 'Highlight',
      transparent: true, opacity: 0.5
     } );
    this.selectedMaterial = new THREE.MeshStandardMaterial( {
      color: '#ffff00', metalness: 1, roughness: 0.5, name: 'Highlight',
      transparent: true, opacity: 0.5
     } );
  }

  private updateMaterial(material: Material): void {
    if (this.materialPreview) {
      this.materialPreview.updateMaterial(material);
      this.materialPreview.Render();
    }
    this.changedMaterial.emit(material);
  }

  public onSave(): void {
    const json = JSON.stringify(this.libraryService.Library);
    const blob = new Blob([json], {type: 'text/plain;charset=utf-8'});
    saveAs.saveAs(blob, this.libraryService.Library.name + '.matlib');
  }
  public onNew(): void {
    this.Materials = new Materials();
    this.Materials.name = 'Material set ' + this.libraryService.Library.materials.length;
    this.libraryService.Library.current = this.libraryService.Library.materials.length;
    this.libraryService.Library.materials.push(this.Materials);
    this.sceneService.resetLights();
    if (this.materialEditor) {
      this.materialEditor.Material = null;
      this.materialEditor.updateSelection();
    }
    this.updateMaterial(null);
  }

  public onClone(): void {
    this.Materials = this.Materials.clone();
    this.Materials.name += ' Copy';
    this.libraryService.Library.current = this.libraryService.Library.materials.length;
    this.libraryService.Library.materials.push(this.Materials);
    this.sceneService.resetLights();
    this.materialEditor.Material = null;
    this.materialEditor.updateSelection();
    this.updateMaterial(this.materialEditor.Material);
  }

  public onClear(): void {
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Clear materials library',
        label: 'All materials in the library will be deleted and one empty created. ',
        message: 'Do you want to continue?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryService.Library.clear();
        this.Materials = this.libraryService.Library.materials[0];
        this.Material = null;
        this.sceneService.resetLights();
        this.materialEditor.updateSelection();
        this.updateMaterial(null);
      }
    });
  }

  public onMaterialChanged(material: Material): void {
    if (this.Material !== material) { this.materialPreview.updateObject(null); }
    this.Material = material;
    this.updateMaterial(material);
  }

  onNewMaterial(material: Material): void {
    this.Material = material;
  }

  public onSelectionChange(change: MatSelectChange): void {
    this.Materials = change.value as Materials;
    this.Material = this.Materials.materials.length === 0 ? null : this.Materials.materials[0];
    this.materialEditor.Material = this.Material;
    this.libraryService.setCurrentMaterials(this.Materials);
    this.sceneService.resetLights();
    this.materialEditor.updateSelection();
    this.updateMaterial(this.Material);
    this.materialPreview.updateObject(null);
  }

  public onSelectedTabChange(index: number) {
    if (index === 1) {
      this.activeTab = true;
      this.setDragControl();
    } else {
      this.updateDragControl = true;
      this.removeDragControl();
      this.removeHighlighting();
      this.removeSelection();
      this.activeTab = false;
    }
  }

  public onImport(event: any): void {
    this.importLibrary(event.target.files[0]);
    event.target.value = '';
  }

  public importLibrary(file: File): void {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        const lib = JSON.parse(fileReader.result as string) as MaterialLibrary;
        const l = new MaterialLibrary();
        lib.clone = l.clone.bind(lib);
        if (lib.current === undefined) { lib.current = 0; }
        this.libraryService.importLibrary(lib.clone());
        this.libraryService.setCurrentMaterials(this.Materials);
        this.sceneService.resetLights();
        this.Materials = this.libraryService.currentMaterials;
        this.Material = this.Materials.materials.length > 0 ? this.Materials.materials[0] : null;
        if (this.materialEditor) {
          this.materialEditor.updateSelection();
          this.materialEditor.Material = this.libraryService.currentMaterials.materials.length > 0 ?
            this.libraryService.currentMaterials.materials[0] : null;
        }
        if (!this.Material) {
          this.Material = this.libraryService.currentMaterials.materials[0];
        }
        this.updateMaterial(null);
        const dialogRef = this.confirmationDialog.open(ErrorDialogComponent, {
          width: '350px',
          data: {
            title: 'Success',
            label: 'Material library imported from: ',
            message: file.name,
            close: true
          }
        });
      } catch (e) {
        const dialogRef = this.confirmationDialog.open(ErrorDialogComponent, {
          width: '350px',
          data: {
            title: 'Error',
            label: 'Failure to read materials library: ',
            message: e,
            cancel: true
          }
        });
      }
    };
    fileReader.onerror = (error) => {
      const dialogRef = this.confirmationDialog.open(ErrorDialogComponent, {
        width: '350px',
        data: {
          title: 'Error',
          label: 'Failure to read file: ',
          message: error,
          cancel: true
        }
      });
    };

    fileReader.readAsText(file, 'UTF-8');
  }

  public onDelete(): void {
    if (this.deleteDisabled) { return; }
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete material set',
        label: 'Current material set will be deleted. ',
        message: 'Do you want to continue?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let current = this.libraryService.Library.current;
        this.libraryService.Library.materials.splice(current, 1);
        if (current >= this.libraryService.Library.materials.length) {
          current = this.libraryService.Library.materials.length - 1;
        }
        this.libraryService.Library.current = current;
        if (current < 0) {
          this.Materials = null;
        } else {
          this.Materials = this.libraryService.Library.materials[current];
        }
        this.materialEditor.Material = null;
        this.materialEditor.updateSelection();
        this.updateMaterial(null);
      }
    });
  }

  public onGetFromScene(): void {
    const materials = this.sceneService.getSceneMaterials();
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Add materials from scene',
        label: materials.materials.length + ' materials will be added. ',
        message: 'Do you want to continue?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Materials = materials;
        this.Materials.name = 'From scene';
        this.libraryService.Library.current = this.libraryService.Library.materials.length;
        this.libraryService.Library.materials.push(this.Materials);
        this.sceneService.resetLights();
        if (this.materialEditor) {
          this.materialEditor.Material = null;
          this.materialEditor.updateSelection();
        }
        this.updateMaterial(this.materialEditor.Material);
      }
    });
  }

  private removeDragControl(): void {
    if (this.dragControl) {
      this.dragControl.enabled = false;
      this.dragControl.deactivate();
      delete this.dragControl;
      this.dragControl = null;
    }
  }

  public setDragControl(force = false): void {
    if (!this.activeTab) {
      this.updateDragControl = true;
      return;
    }
    if (force) { this.updateDragControl = true; }
    if (!this.updateDragControl) { return; }
    this.dragControl = this.sceneService.getDragControl(
      this.sceneService.getSelectableObjects()
    );
    this.dragControl.enabled = false;
    this.dragControl.addEventListener('hoveron',
      this.onDragHoveron.bind(this));
    this.dragControl.addEventListener('hoveroff',
      this.onDragHoveroff.bind(this));
    this.dragControl.addEventListener('dragstart',
      this.onDragStart.bind(this));
    this.dragControl.addEventListener('drag',
      this.onDragStart.bind(this));
    this.updateDragControl = false;
  }

  private onDragHoveron(event: DragEvent): void {
    if (event.event.altKey) { return; }
    this.removeHighlighting();
    if (event.object instanceof THREE.Mesh && this.doHighlighting) {
      const mesh = event.object as THREE.Mesh;
      if (mesh !== this.selectedObject) {
        this.highlightedObject = mesh;
        this.highlightedObjectMaterial = mesh.material;
        mesh.material = this.highlightedMaterial;
      }
    }
    this.updateMaterial(null);
  }

  private onDragHoveroff(event: DragEvent): void {
    this.removeHighlighting();
    this.updateMaterial(null);
  }

  private removeHighlighting(): void {
    if (this.highlightedObject) {
      if (this.highlightedObject instanceof THREE.Mesh) {
        const mesh = this.highlightedObject as THREE.Mesh;
        mesh.material = this.highlightedObjectMaterial;
        this.highlightedObjectMaterial = null;
        this.highlightedObject = null;
      }
    }
  }

  private removeSelection(): void {
    if (this.selectedObject) {
      if (this.selectedObject instanceof THREE.Mesh) {
        const mesh = this.selectedObject as THREE.Mesh;
        mesh.material = this.selectedObjectMaterial;
        this.selectedObjectMaterial = null;
        this.selectedObject = null;
      }
    }
  }

  private suspendHighlighting(timeout: number) {
    this.doHighlighting = false;
    setTimeout(() => {
      this.doHighlighting = true;
      this.removeSelection();
      this.updateMaterial(null);
    }, timeout);
  }

  private onDragStart(event: DragEvent): void {
    if (event.event.button !== 0 || event.event.altKey) { return; }
    this.removeSelection();
    this.removeHighlighting();
    if (event.object instanceof THREE.Mesh) {
      this.selectMesh(event.object as THREE.Mesh, event.event.ctrlKey);
      this.suspendHighlighting(1000);
    }
    this.updateMaterial(null);
  }

  private selectMesh(mesh: THREE.Mesh, assign: boolean): void {
    this.selectedObject = mesh;
    this.generateMissingUVs(mesh, true);
    this.selectedObjectMaterial = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
    if (assign || this.assignMaterial) {
      if (this.Material) {
        mesh.material = this.Material.material;
        this.selectedObjectMaterial = mesh.material;
        this.materialPreview.updateObject(mesh);
        this.updateMaterial(null);
      }
      return;
    }
    if (Array.isArray(mesh.material)) {
      if (!this.selectMaterial(mesh.material[0] as THREE.Material)) {
        const mat = mesh.material[0] as THREE.Material;
        if (!this.dialogRaised) {
          this.dialogRaised = true;
          const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {
              title: 'Add material',
              label: 'Material not found. ',
              message: 'Do you want to add selected material to the current library?'
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.addMaterial(mat);
              this.suspendHighlighting(2000);
              this.materialPreview.updateObject(mesh);
            }
            this.dialogRaised = false;
          });
        }
      } else {
        this.materialPreview.updateObject(mesh);
      }
    } else {
      if (!this.selectMaterial(mesh.material as THREE.Material)) {
        const mat = mesh.material as THREE.Material;
        if (!this.dialogRaised) {
          this.dialogRaised = true;
          const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {
              title: 'Add material',
              label: 'Material not found. ',
              message: 'Do you want to add selected material to the current library?'
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.addMaterial(mat);
              this.suspendHighlighting(2000);
              this.materialPreview.updateObject(mesh);
            }
            this.dialogRaised = false;
          });
        }
      } else {
        this.materialPreview.updateObject(mesh);
      }
    }
    mesh.material = this.selectedMaterial;
  }

  private generateMissingUVs(mesh: THREE.Mesh, first: boolean) {
    if (!(mesh.geometry instanceof THREE.BufferGeometry)) { return; }
    const g = mesh.geometry as THREE.BufferGeometry;
    if (g.attributes.uv) { return; }

    // find out the dimensions, to let texture size 100% fit without stretching
    g.computeBoundingBox();
    const bboxSize = g.boundingBox.getSize(new THREE.Vector3());
    const uvMapSize = Math.min(bboxSize.x, bboxSize.y, bboxSize.z);

    // calculate UV coordinates, if uv attribute is not present, it will be added
    this.applyBoxUV(g, new THREE.Matrix4(), uvMapSize);

    // let three.js know
    (g.attributes.uv as THREE.BufferAttribute).needsUpdate = true;

    if (!first) { return; }
    const objects = this.sceneService.getSelectableObjects();
    for (const o of objects) {
      if (!(o instanceof THREE.Mesh)) { continue; }
      this.generateMissingUVs(o as THREE.Mesh, false);
    }
  }

  private addMaterial(material: THREE.Material): void {

    const scene = this.sceneService.getScene();
    if (scene == null) { return; }
    const mat = Material.CreateMaterial(material);
    this.Materials.materials.push(mat);
    this.Material = mat;
    this.materialEditor.Material = mat;
    this.materialEditor.updateSelection();
    this.updateMaterial(mat);
  }

  private hasMaterial(material: THREE.Material): boolean {
    for (const materials of this.libraryService.Library.materials) {
      for (const m of materials.materials) {
        if (m.material === material) { return true; }
      }
    }

    return false;
  }

  private selectMaterial(material: THREE.Material): boolean {
    for (const materials of this.Library.materials) {
      for (const m of materials.materials) {
        if (m.material === material) {
          const imat = this.Library.materials.indexOf(materials);
          if (imat >= 0) {
            this.Library.current = imat;
            this.Materials = materials;
            this.Material = m;
            return true;
          }
        }
      }
    }

    return false;
  }

  public onAssignMaterialChange(event: MatCheckboxChange): void {
    this.assignMaterial = event.checked;
  }

  public onLightsChanged(): void {
    this.materialPreview.resetLights();
    this.materialPreview.Render();
  }

  public onEditorResized(event: ResizedEvent): void {
    this.materialPreview.onEditorResized(event);
  }

  private _applyBoxUV(geom: THREE.BufferGeometry, transformMatrix: THREE.Matrix4,
                      bbox: THREE.Box3, bboxMaxSize: number) {

    const coords = [];
    coords.length = 2 * geom.attributes.position.array.length / 3;

    // geom.removeAttribute('uv');
    if (geom.attributes.uv === undefined) {
        geom.addAttribute('uv', new THREE.Float32BufferAttribute(coords, 2));
    }

    // maps 3 verts of 1 face on the better side of the cube
    // side of the cube can be XY, XZ or YZ
    const makeUVs = (v0: THREE.Vector3, v1: THREE.Vector3, v2: THREE.Vector3): UVs => {

        // pre-rotate the model so that cube sides match world axis
        v0.applyMatrix4(transformMatrix);
        v1.applyMatrix4(transformMatrix);
        v2.applyMatrix4(transformMatrix);

        // get normal of the face, to know into which cube side it maps better
        const n = new THREE.Vector3();
        n.crossVectors(v1.clone().sub(v0), v1.clone().sub(v2)).normalize();

        n.x = Math.abs(n.x);
        n.y = Math.abs(n.y);
        n.z = Math.abs(n.z);

        const uv0 = new THREE.Vector2();
        const uv1 = new THREE.Vector2();
        const uv2 = new THREE.Vector2();
        // xz mapping
        if (n.y > n.x && n.y > n.z) {
            uv0.x = (v0.x - bbox.min.x) / bboxMaxSize;
            uv0.y = (bbox.max.z - v0.z) / bboxMaxSize;

            uv1.x = (v1.x - bbox.min.x) / bboxMaxSize;
            uv1.y = (bbox.max.z - v1.z) / bboxMaxSize;

            uv2.x = (v2.x - bbox.min.x) / bboxMaxSize;
            uv2.y = (bbox.max.z - v2.z) / bboxMaxSize;
        } else
        if (n.x > n.y && n.x > n.z) {
            uv0.x = (v0.z - bbox.min.z) / bboxMaxSize;
            uv0.y = (v0.y - bbox.min.y) / bboxMaxSize;

            uv1.x = (v1.z - bbox.min.z) / bboxMaxSize;
            uv1.y = (v1.y - bbox.min.y) / bboxMaxSize;

            uv2.x = (v2.z - bbox.min.z) / bboxMaxSize;
            uv2.y = (v2.y - bbox.min.y) / bboxMaxSize;
        } else
        if (n.z > n.y && n.z > n.x) {
            uv0.x = (v0.x - bbox.min.x) / bboxMaxSize;
            uv0.y = (v0.y - bbox.min.y) / bboxMaxSize;

            uv1.x = (v1.x - bbox.min.x) / bboxMaxSize;
            uv1.y = (v1.y - bbox.min.y) / bboxMaxSize;

            uv2.x = (v2.x - bbox.min.x) / bboxMaxSize;
            uv2.y = (v2.y - bbox.min.y) / bboxMaxSize;
        }

        return { uv0, uv1, uv2 };
    };

    if (geom.index) { // is it indexed buffer geometry?
        for (let vi = 0; vi < geom.index.array.length; vi += 3) {
            const idx0 = geom.index.array[vi];
            const idx1 = geom.index.array[vi + 1];
            const idx2 = geom.index.array[vi + 2];

            const vx0 = geom.attributes.position.array[3 * idx0];
            const vy0 = geom.attributes.position.array[3 * idx0 + 1];
            const vz0 = geom.attributes.position.array[3 * idx0 + 2];

            const vx1 = geom.attributes.position.array[3 * idx1];
            const vy1 = geom.attributes.position.array[3 * idx1 + 1];
            const vz1 = geom.attributes.position.array[3 * idx1 + 2];

            const vx2 = geom.attributes.position.array[3 * idx2];
            const vy2 = geom.attributes.position.array[3 * idx2 + 1];
            const vz2 = geom.attributes.position.array[3 * idx2 + 2];

            const v0 = new THREE.Vector3(vx0, vy0, vz0);
            const v1 = new THREE.Vector3(vx1, vy1, vz1);
            const v2 = new THREE.Vector3(vx2, vy2, vz2);

            const uvs = makeUVs(v0, v1, v2);

            coords[2 * idx0] = uvs.uv0.x;
            coords[2 * idx0 + 1] = uvs.uv0.y;

            coords[2 * idx1] = uvs.uv1.x;
            coords[2 * idx1 + 1] = uvs.uv1.y;

            coords[2 * idx2] = uvs.uv2.x;
            coords[2 * idx2 + 1] = uvs.uv2.y;
        }
    } else {
        for (let vi = 0; vi < geom.attributes.position.array.length; vi += 9) {
          const vx0 = geom.attributes.position.array[vi];
          const vy0 = geom.attributes.position.array[vi + 1];
          const vz0 = geom.attributes.position.array[vi + 2];

          const vx1 = geom.attributes.position.array[vi + 3];
          const vy1 = geom.attributes.position.array[vi + 4];
          const vz1 = geom.attributes.position.array[vi + 5];

          const vx2 = geom.attributes.position.array[vi + 6];
          const vy2 = geom.attributes.position.array[vi + 7];
          const vz2 = geom.attributes.position.array[vi + 8];

          const v0 = new THREE.Vector3(vx0, vy0, vz0);
          const v1 = new THREE.Vector3(vx1, vy1, vz1);
          const v2 = new THREE.Vector3(vx2, vy2, vz2);

          const uvs = makeUVs(v0, v1, v2);

          const idx0 = vi / 3;
          const idx1 = idx0 + 1;
          const idx2 = idx0 + 2;

          coords[2 * idx0] = uvs.uv0.x;
          coords[2 * idx0 + 1] = uvs.uv0.y;

          coords[2 * idx1] = uvs.uv1.x;
          coords[2 * idx1 + 1] = uvs.uv1.y;

          coords[2 * idx2] = uvs.uv2.x;
          coords[2 * idx2 + 1] = uvs.uv2.y;
        }
    }

    geom.attributes.uv.array = new Float32Array(coords);
}

private applyBoxUV(bufferGeometry: THREE.BufferGeometry, transformMatrix: THREE.Matrix4, boxSize: number) {

    if (transformMatrix === undefined) {
        transformMatrix = new THREE.Matrix4();
    }

    if (boxSize === undefined) {
      const geom = bufferGeometry;
      geom.computeBoundingBox();
      const bbox = geom.boundingBox;

      const bboxSizeX = bbox.max.x - bbox.min.x;
      const bboxSizeZ = bbox.max.z - bbox.min.z;
      const bboxSizeY = bbox.max.y - bbox.min.y;

      boxSize = Math.max(bboxSizeX, bboxSizeY, bboxSizeZ);
    }

    const uvBbox = new THREE.Box3(
      new THREE.Vector3(-boxSize / 2, -boxSize / 2, -boxSize / 2),
      new THREE.Vector3(boxSize / 2, boxSize / 2, boxSize / 2)
      );

    this._applyBoxUV(bufferGeometry, transformMatrix, uvBbox, boxSize);
  }
}
