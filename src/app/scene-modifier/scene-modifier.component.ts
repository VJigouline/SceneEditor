import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThreeSceneService } from '../three-scene.service';

@Component({
  selector: 'app-scene-modifier',
  templateUrl: './scene-modifier.component.html',
  styleUrls: ['./scene-modifier.component.scss']
})
export class SceneModifierComponent implements OnInit {

  @Output() sceneChanged = new EventEmitter<string>();

  constructor(
    private sceneService: ThreeSceneService,
  ) { }

  ngOnInit() {
  }

  public onNewScene(): void {
    this.sceneChanged.emit('new');
  }

  public onAddToScene(): void {
    this.sceneChanged.emit('add');
  }

  public onUpdateScene(): void {
    this.sceneChanged.emit('update');
  }
}
