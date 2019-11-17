import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SceneModifierComponent } from '../scene-modifier/scene-modifier.component';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  @Output() sceneChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSceneChange(op: string): void {
    this.sceneChanged.emit(op);
  }
}
