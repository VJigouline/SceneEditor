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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { SceneSaverComponent } from './scene-saver/scene-saver.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { LightEditorComponent } from './light-editor/light-editor.component';
import { LightsLibraryEditorComponent } from './lights-library-editor/lights-library-editor.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SceneComponent } from './scene/scene.component';
import { SceneModifierComponent } from './scene-modifier/scene-modifier.component';
import { LightsModule} from './lights/lights.module';
import { FormsModule } from '@angular/forms';
import { UserControlsModule } from './user-controls/user-controls.module';
import { MaterialsLibraryEditorComponent } from './materials-library-editor/materials-library-editor.component';
import { MaterialsModule } from './materials/materials.module';
import { TexturesModule } from './textures/textures.module';

@NgModule({
  declarations: [
    AppComponent,
    SceneEditorComponent,
    SceneViewComponent,
    MaterialEditorComponent,
    SceneSaverComponent,
    LightEditorComponent,
    LightsLibraryEditorComponent,
    SceneComponent,
    SceneModifierComponent,
    MaterialsLibraryEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSplitModule.forRoot(),
    AngularResizedEventModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatSliderModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgxFileDropModule,
    LightsModule,
    FormsModule,
    UserControlsModule,
    MaterialsModule,
    TexturesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
