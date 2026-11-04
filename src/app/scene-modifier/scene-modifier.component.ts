import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThreeSceneService } from '../three-scene.service';

@Component({
  standalone: false,
  selector: 'app-scene-modifier',
  templateUrl: './scene-modifier.component.html',
  styleUrls: ['./scene-modifier.component.scss']
})
export class SceneModifierComponent implements OnInit {

  @Output() sceneChanged = new EventEmitter<string>();
  @Output() filesOpened = new EventEmitter<File[]>();

  constructor(
    private sceneService: ThreeSceneService,
  ) { }

  ngOnInit() {
  }

  public onOpenFiles(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Clearing the input empties its live file list, so copy the list first.
    // Clearing also lets the same file be opened twice in a row.
    const files = Array.from(input.files);
    input.value = '';
    if (files.length > 0) { this.filesOpened.emit(files); }
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
