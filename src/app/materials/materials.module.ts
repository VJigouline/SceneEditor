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


@NgModule({
  declarations: [NewMaterialComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatSliderModule,
    ReactiveFormsModule
  ],
  exports: [
    NewMaterialComponent
  ]
})
export class MaterialsModule { }
