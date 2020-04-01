import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLightComponent } from './new-light/new-light.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewLightComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSliderModule,
    ReactiveFormsModule,
  ],
  exports: [
    NewLightComponent
  ]
})
export class LightsModule { }
