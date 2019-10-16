import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThreeSceneService } from '../three-scene.service';

@Component({
  selector: 'app-scene-modifier',
  templateUrl: './scene-modifier.component.html',
  styleUrls: ['./scene-modifier.component.scss']
})
export class SceneModifierComponent implements OnInit {

  @Output() onSceneChanged = new EventEmitter<string>();

  constructor(
    private sceneService: ThreeSceneService,
  ) { }

  ngOnInit() {
  }

  private onNewScene(): void {
    this.onSceneChanged.emit('new');
  }

  private onAddToScene(): void {
    this.onSceneChanged.emit('add');
  }
}
