import { Component, OnInit, Output, EventEmitter, signal, ViewChild, ElementRef } from '@angular/core';
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
  @Output() urlOpened = new EventEmitter<string>();

  readonly showUrl = signal(false);
  url = '';
  @ViewChild('urlInput') private urlInput: ElementRef<HTMLInputElement>;

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

  public onToggleUrl(): void {
    this.showUrl.update(shown => !shown);
    if (this.showUrl()) { setTimeout(() => this.urlInput?.nativeElement.focus()); }
  }

  public onOpenUrl(): void {
    const url = this.url.trim();
    if (!url) { return; }
    this.urlOpened.emit(url);
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
