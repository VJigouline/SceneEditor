import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLightComponent } from './new-light/new-light.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { AmbientLightEditorComponent } from './ambient-light-editor/ambient-light-editor.component';
import { DirectionalLightEditorComponent } from './directional-light-editor/directional-light-editor.component';
import { HemisphereLightEditorComponent } from './hemisphere-light-editor/hemisphere-light-editor.component';
import { PointLightEditorComponent } from './point-light-editor/point-light-editor.component';
import { RectareaLightEditorComponent } from './rectarea-light-editor/rectarea-light-editor.component';
import { SpotLightEditorComponent } from './spot-light-editor/spot-light-editor.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { UserControlsModule } from '../user-controls/user-controls.module';

@NgModule({
  declarations: [
    NewLightComponent,
    AmbientLightEditorComponent,
    DirectionalLightEditorComponent,
    HemisphereLightEditorComponent,
    PointLightEditorComponent,
    RectareaLightEditorComponent,
    SpotLightEditorComponent
  ],
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
    ColorPickerModule,
    UserControlsModule
  ],
  exports: [
    NewLightComponent,
    AmbientLightEditorComponent,
    DirectionalLightEditorComponent,
    HemisphereLightEditorComponent,
    PointLightEditorComponent,
    RectareaLightEditorComponent,
    SpotLightEditorComponent
  ]
})
export class LightsModule { }
