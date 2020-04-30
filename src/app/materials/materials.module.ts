import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMaterialComponent } from './new-material/new-material.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { MeshStandardMaterialEditorComponent } from './mesh-standard-material-editor/mesh-standard-material-editor.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [NewMaterialComponent, MeshStandardMaterialEditorComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSliderModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  exports: [
    NewMaterialComponent,
    MeshStandardMaterialEditorComponent
  ]
})
export class MaterialsModule { }
