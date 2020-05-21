import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextureEditorComponent } from './texture-editor/texture-editor.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { UserControlsModule } from '../user-controls/user-controls.module';
import { CubeMapDialogComponent } from './cube-map-dialog/cube-map-dialog.component';

@NgModule({
  declarations: [TextureEditorComponent, CubeMapDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSliderModule,
    ReactiveFormsModule,
    UserControlsModule
  ],
  exports: [
    TextureEditorComponent,
    CubeMapDialogComponent
  ]
})
export class TexturesModule { }
