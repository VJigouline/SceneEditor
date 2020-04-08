import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point3DComponent } from './point3-d/point3-d.component';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [Point3DComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule
  ],
  exports: [
    Point3DComponent
  ]
})
export class UserControlsModule { }
