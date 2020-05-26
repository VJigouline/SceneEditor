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
import { MeshPhongMaterialEditorComponent } from './mesh-phong-material-editor/mesh-phong-material-editor.component';
import { MeshBasicMaterialEditorComponent } from './mesh-basic-material-editor/mesh-basic-material-editor.component';
import { MeshDepthMaterialEditorComponent } from './mesh-depth-material-editor/mesh-depth-material-editor.component';
import { MeshLambertMaterialEditorComponent } from './mesh-lambert-material-editor/mesh-lambert-material-editor.component';
import { MeshMatcapMaterialEditorComponent } from './mesh-matcap-material-editor/mesh-matcap-material-editor.component';

@NgModule({
  declarations: [
    NewMaterialComponent,
    MeshStandardMaterialEditorComponent,
    BaseMaterialEditorComponent,
    MaterialPreviewComponent,
    MeshPhongMaterialEditorComponent,
    MeshBasicMaterialEditorComponent,
    MeshDepthMaterialEditorComponent,
    MeshLambertMaterialEditorComponent,
    MeshMatcapMaterialEditorComponent
  ],
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
    MeshBasicMaterialEditorComponent,
    MeshDepthMaterialEditorComponent,
    MeshLambertMaterialEditorComponent,
    MeshMatcapMaterialEditorComponent,
    MeshPhongMaterialEditorComponent,
    MeshStandardMaterialEditorComponent,
    MaterialPreviewComponent
  ]
})
export class MaterialsModule { }
