import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { AngularResizedEventModule } from 'angular-resize-event';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SceneEditorComponent } from './scene-editor/scene-editor.component';
import { SceneViewComponent } from './scene-view/scene-view.component';
import { MaterialEditorComponent } from './material-editor/material-editor.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { SceneSaverComponent } from './scene-saver/scene-saver.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { LightEditorComponent } from './light-editor/light-editor.component';
import { LightsLibraryEditorComponent } from './lights-library-editor/lights-library-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    SceneEditorComponent,
    SceneViewComponent,
    MaterialEditorComponent,
    SceneSaverComponent,
    LightEditorComponent,
    LightsLibraryEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSplitModule.forRoot(),
    AngularResizedEventModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSliderModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
