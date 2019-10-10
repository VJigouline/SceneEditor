import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ThreeSceneService } from '../three-scene.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { Material } from '../material';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.scss']
})
export class MaterialEditorComponent {

  // events
  @Output() materialChange = new EventEmitter<Material>();

  // properties
  sceneJSON: string;
  material = new Material();

  materialForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  states = [
    {name: 'Alabama', abbreviation: 'AL'},
    {name: 'Alaska', abbreviation: 'AK'},
    {name: 'American Samoa', abbreviation: 'AS'},
    {name: 'Virginia', abbreviation: 'VA'},
    {name: 'Washington', abbreviation: 'WA'},
    {name: 'West Virginia', abbreviation: 'WV'},
    {name: 'Wisconsin', abbreviation: 'WI'},
    {name: 'Wyoming', abbreviation: 'WY'}
  ];

  constructor(
    private fb: FormBuilder,
    private sceneService: ThreeSceneService
  ) {}

  onSubmit() {
    this.getSceneJSON();
  }

  getSceneJSON(): void {
// this.sceneService.getSceneJSON().subscribe(sceneJSON => this.sceneJSON = sceneJSON);
  }

  onDiffuseColourChanged(colour: string): void {
    this.material.diffuse = colour;
    this.materialChange.emit(this.material);
  }

  onEmissiveColourChanged(colour: string): void {
    this.material.emissive = colour;
    this.materialChange.emit(this.material);
  }

  onSpecularColourChanged(colour: string): void {
    this.material.specular = colour;
    this.materialChange.emit(this.material);
  }
}
