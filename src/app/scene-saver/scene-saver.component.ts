import { Component, OnInit } from '@angular/core';
import { ThreeSceneService } from '../three-scene.service';
import { saveAs } from 'file-saver';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

@Component({
  selector: 'app-scene-saver',
  templateUrl: './scene-saver.component.html',
  styleUrls: ['./scene-saver.component.scss']
})
export class SceneSaverComponent implements OnInit {
  message: string;

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

    gltfExporter.parse( this.sceneService.getScene(), gltf => {
      this.saveScene( gltf );
    }, options );

  }

  saveScene(gltf: any): void {
    const blob = new Blob([JSON.stringify(gltf)], {type: 'text/plain;charset=utf-8'});
    saveAs.saveAs(blob, 'scene.gltf');
  }
}
