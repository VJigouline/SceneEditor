import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RaytraceService } from '../raytracer/raytrace.service';

/** Scene tab panel that switches the view to ray tracing and sets how it is traced. */
@Component({
  standalone: false,
  selector: 'app-raytrace-settings',
  templateUrl: './raytrace-settings.component.html',
  styleUrls: ['./raytrace-settings.component.scss']
})
export class RaytraceSettingsComponent {
  readonly sampleOptions = [16, 64, 256, 1024];

  constructor(public raytrace: RaytraceService) { }

  onEnabledChange(event: MatSlideToggleChange): void {
    this.raytrace.setEnabled(event.checked);
  }

  onSamplesChange(event: MatSelectChange): void {
    this.raytrace.samples = event.value;
    this.raytrace.update();
  }

  onShadowsChange(event: MatCheckboxChange): void {
    this.raytrace.shadows = event.checked;
    this.raytrace.update();
  }

  onGlobalIlluminationChange(event: MatCheckboxChange): void {
    this.raytrace.globalIllumination = event.checked;
    this.raytrace.update();
  }

  onSave(): void {
    this.raytrace.saveImage();
  }
}
