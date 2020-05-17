import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMaterialComponent } from './new-material/new-material.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { MeshStandardMaterialEditorComponent } from './mesh-standard-material-editor/mesh-standard-material-editor.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { BaseMaterialEditorComponent } from './base-material-editor/base-material-editor.component';
import { TexturesModule } from '../textures/textures.module';
import { MaterialPreviewComponent } from './material-preview/material-preview.component';
import { UserControlsModule } from '../user-controls/user-controls.module';

@NgModule({
  declarations: [NewMaterialComponent, MeshStandardMaterialEditorComponent, BaseMaterialEditorComponent, MaterialPreviewComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSliderModule,
    ReactiveFormsModule,
    ColorPickerModule,
    TexturesModule,
    UserControlsModule
  ],
  exports: [
    NewMaterialComponent,
    MeshStandardMaterialEditorComponent,
    MaterialPreviewComponent
  ]
})
export class MaterialsModule { }
