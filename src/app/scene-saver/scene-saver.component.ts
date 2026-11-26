import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as THREE from 'three';
import { saveAs } from 'file-saver';
import { exportGltf, createDracoEncoder, type DracoEncoderModule } from 'mc-gltf-export';
import { exportObj } from 'mc-obj-export';
import { exportStl } from 'mc-stl-export';
import { exportPly } from 'mc-ply-export';
import { exportUsdz } from 'mc-usdz-export';
import { export3mf } from 'mc-3mf-export';
import { ThreeSceneService } from '../three-scene.service';
import { ErrorDialogComponent } from '../user-controls/error-dialog/error-dialog.component';
import { ExportFileType } from './export-file-type.enum';

/** A file to download. */
interface Download { name: string; data: Uint8Array | string; mimeType: string; }

// The Draco encoder SceneEditor serves, loaded once when first needed.
let dracoEncoder: Promise<DracoEncoderModule> | undefined;
const draco = () => dracoEncoder ??= fetch('assets/lib/draco/draco_encoder.js')
  .then(r => r.text())
  .then(source => createDracoEncoder(source));

/** The editor's own objects: the transform gizmo and light helpers, which are not part of the model. */
export function isEditorHelper(object: THREE.Object3D): boolean {
  for (let o: THREE.Object3D | null = object; o; o = o.parent) {
    const flags = o as THREE.Object3D & { isTransformControlsRoot?: boolean; isTransformControlsGizmo?: boolean; isTransformControlsPlane?: boolean };
    if (o.type.endsWith('Helper') || flags.isTransformControlsRoot || flags.isTransformControlsGizmo || flags.isTransformControlsPlane) { return true; }
  }
  return false;
}

@Component({
  standalone: false,
  selector: 'app-scene-saver',
  templateUrl: './scene-saver.component.html',
  styleUrls: ['./scene-saver.component.scss']
})

export class SceneSaverComponent implements OnInit {
  message: string;
  readonly saving = signal(false);
  exportType = ExportFileType.GLB;
  public exportOptions = [
    { type: ExportFileType.GLB, name: 'glTF binary (glb)' },
    { type: ExportFileType.GLTF, name: 'glTF text (gltf)' },
    { type: ExportFileType.GLB_DRACO, name: 'glTF with Draco compression (glb)' },
    { type: ExportFileType.OBJ, name: 'Wavefront OBJ with materials (zip)' },
    { type: ExportFileType.STL, name: 'STL for 3D printing (stl, mm)' },
    { type: ExportFileType.THREE_MF, name: '3MF for 3D printing (3mf, mm)' },
    { type: ExportFileType.PLY, name: 'PLY meshes and point clouds (ply)' },
    { type: ExportFileType.USDZ, name: 'USDZ for AR Quick Look (usdz)' },
    { type: ExportFileType.THREE_SCENE, name: 'Three scene (json)' }
  ];

  constructor(
    private sceneService: ThreeSceneService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.saving.set(true);
    this.export(this.exportType)
      .then(download => {
        saveAs(new Blob([download.data as BlobPart], { type: download.mimeType }), download.name);
      })
      .catch(error => this.dialog.open(ErrorDialogComponent, {
        width: '350px',
        data: { title: 'Failure', label: 'The scene cannot be saved: ', message: error instanceof Error ? error.message : String(error), close: true }
      }))
      .finally(() => this.saving.set(false));
  }

  /** Writes the scene in the format asked for, without the editor's helpers. */
  public async export(type: ExportFileType): Promise<Download> {
    const scene = this.sceneService.getScene();
    const filter = (o: THREE.Object3D) => !isEditorHelper(o);
    const report = (format: string, warnings: string[]) => {
      for (const warning of warnings) { console.warn(`${format} export: ${warning}`); }
    };
    switch (type) {
      case ExportFileType.THREE_SCENE:
        return { name: 'scene.json', data: JSON.stringify(scene.toJSON()), mimeType: 'application/json' };
      case ExportFileType.GLB:
      case ExportFileType.GLTF:
      case ExportFileType.GLB_DRACO: {
        const roots = scene.children.filter(filter);
        const result = await exportGltf(roots, {
          binary: type !== ExportFileType.GLTF,
          draco: type === ExportFileType.GLB_DRACO ? { encoder: await draco() } : false
        });
        report('glTF', result.warnings);
        return result.file;
      }
      case ExportFileType.OBJ: {
        const result = await exportObj(scene, { filter });
        report('OBJ', result.warnings);
        return result.zip;
      }
      case ExportFileType.STL: {
        const result = exportStl(scene, { filter });
        report('STL', result.warnings);
        return result.file;
      }
      case ExportFileType.THREE_MF: {
        const result = export3mf(scene, { filter });
        report('3MF', result.warnings);
        return result.file;
      }
      case ExportFileType.PLY: {
        const result = exportPly(scene, { filter });
        report('PLY', result.warnings);
        return result.file;
      }
      case ExportFileType.USDZ: {
        const result = await exportUsdz(scene, { filter });
        report('USDZ', result.warnings);
        return result.file;
      }
    }
  }
}
