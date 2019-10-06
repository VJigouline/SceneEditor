import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ThreeSceneService } from '../three-scene.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-scene-saver',
  templateUrl: './scene-saver.component.html',
  styleUrls: ['./scene-saver.component.scss']
})
export class SceneSaverComponent implements OnInit {
  message: string;

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

    const blob = new Blob([this.sceneService.getSceneJSON()], {type: 'text/plain;charset=utf-8'});
    saveAs.saveAs(blob, 'scene.json');
  }

}
