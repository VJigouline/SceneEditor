import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import * as THREE from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

import { ThreeSceneService } from '../three-scene.service';
import { ExportFileType } from './export-file-type.enum';
import { isEditorHelper, SceneSaverComponent } from './scene-saver.component';

describe('SceneSaverComponent', () => {
  let component: SceneSaverComponent;
  let scene: THREE.Scene;

  beforeEach(() => {
    scene = new THREE.Scene();
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.02, 0.03), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
    box.name = 'Box';
    scene.add(box);
    const light = new THREE.DirectionalLight();
    scene.add(light, new THREE.DirectionalLightHelper(light));
    TestBed.configureTestingModule({
      declarations: [SceneSaverComponent],
      // The template's Material elements are not under test.
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ThreeSceneService, useValue: { getScene: () => scene } },
        { provide: MatDialog, useValue: jasmine.createSpyObj('MatDialog', ['open']) },
        { provide: NgxSpinnerService, useValue: jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']) }
      ]
    });
    component = TestBed.createComponent(SceneSaverComponent).componentInstance;
  });

  it('saves glTF binary by default', () => {
    expect(component.exportType).toBe(ExportFileType.GLB);
  });

  it('tells the editor\'s helpers from the model', () => {
    const controls = new TransformControls(new THREE.PerspectiveCamera(), document.createElement('div'));
    const helper = controls.getHelper();
    expect(isEditorHelper(helper)).toBeTrue();
    expect(isEditorHelper(helper.children[0] ?? helper)).toBeTrue();
    expect(isEditorHelper(scene.children.find(c => c.type === 'DirectionalLightHelper'))).toBeTrue();
    expect(isEditorHelper(scene.getObjectByName('Box'))).toBeFalse();
    controls.dispose();
  });

  it('writes every format, leaving the helpers out', async () => {
    const expected: [ExportFileType, string][] = [
      [ExportFileType.GLB, 'scene.glb'], [ExportFileType.GLTF, 'scene.gltf'], [ExportFileType.OBJ, 'scene.zip'],
      [ExportFileType.STL, 'scene.stl'], [ExportFileType.THREE_MF, 'scene.3mf'], [ExportFileType.PLY, 'scene.ply'],
      [ExportFileType.USDZ, 'scene.usdz'], [ExportFileType.THREE_SCENE, 'scene.json']
    ];
    for (const [type, name] of expected) {
      const file = await component.export(type);
      expect(file.name).withContext(type).toBe(name);
      expect(file.data.length).withContext(type).toBeGreaterThan(0);
    }
    // The STL holds the box's 12 triangles and nothing of the light helper.
    const stl = (await component.export(ExportFileType.STL)).data as Uint8Array;
    expect(new DataView(stl.buffer, stl.byteOffset).getUint32(80, true)).toBe(12);
  });
});
