import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThreeSceneService } from '../three-scene.service';

@Component({
  selector: 'app-scene-saver',
  templateUrl: './scene-saver.component.html',
  styleUrls: ['./scene-saver.component.scss']
})
export class SceneSaverComponent implements OnInit {
  sceneJSON: string;

  saveSceneForm = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.getSceneJSON();
  }

  getSceneJSON(): void {
    this.sceneService.getSceneJSON().subscribe(sceneJSON => this.sceneJSON = sceneJSON);
  }

}
