import { Component, OnInit } from '@angular/core';
import { ThreeSceneService } from '../three-scene.service';
import { saveAs } from 'file-saver';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { ExportFileType } from './export-file-type.enum';

@Component({
  selector: 'app-scene-saver',
  templateUrl: './scene-saver.component.html',
  styleUrls: ['./scene-saver.component.scss']
})

export class SceneSaverComponent implements OnInit {
  message: string;
  exportType = ExportFileType.GLTF;
  public exportOptions = [
    { type: ExportFileType.GLTF, name: 'GL Transmission (gltf)' },
    { type: ExportFileType.THREE_SCENE, name: 'Three scene (json)' }
  ];

  constructor(
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.getSceneJSON();
  }

  getSceneJSON(): void {

    const gltfExporter = new GLTFExporter();

    const options = {
      truncateDrawRange: false
    };

    switch (this.exportType) {
      case ExportFileType.THREE_SCENE:
        this.saveScene(null);
        break;
      default:
        gltfExporter.parse( this.sceneService.getScene(), gltf => {
          this.saveScene( gltf );
        }, options );
        break;
    };
  }

  public saveScene(gltf: any): void {
    let str: string;
    let filename: string;
    switch (this.exportType) {
      case ExportFileType.THREE_SCENE:
        str = JSON.stringify(this.sceneService.getScene().toJSON());
        filename = 'scene.json';
        break;
      default:
        str = JSON.stringify(gltf);
        filename = 'scene.gltf';
        break;
    }
    const blob = new Blob([str], {type: 'text/plain;charset=utf-8'});
    saveAs.saveAs(blob, filename);
  }
}
