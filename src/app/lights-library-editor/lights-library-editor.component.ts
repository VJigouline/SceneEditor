import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Light } from '../lights/light';
import { LightsLibraryService } from '../lights/lights-library.service';
import { ThreeSceneService } from '../three-scene.service';

@Component({
  selector: 'app-lights-library-editor',
  templateUrl: './lights-library-editor.component.html',
  styleUrls: ['./lights-library-editor.component.scss']
})
export class LightsLibraryEditorComponent implements OnInit {

  // events
  @Output() changedLight = new EventEmitter<Light>();

  // properties

  constructor(
    private libraryService: LightsLibraryService,
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.libraryService.library.lights.push(this.sceneService.getLights());
  }

  public onSave(): void {
    alert('Save light');
  }
  public onNew(): void {
    alert('New light');
  }
  public onLoad(): void {
    alert('Load light library');
  }

  public onLightChanged(light: Light): void {
    this.changedLight.emit(light);
  }
}
