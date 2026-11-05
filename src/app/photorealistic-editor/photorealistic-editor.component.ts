import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import * as THREE from 'three';
import {
  describeProgress,
  RaytraceMode,
  RaytraceService,
  RaytraceSettings,
  SAME_AS_VIEW
} from '../raytracer/raytrace.service';

/**
 * The Photorealistic tab: where to show the ray traced image, and every ray tracing setting,
 * laid out like the Lights and Materials tabs.
 */
@Component({
  standalone: false,
  selector: 'app-photorealistic-editor',
  templateUrl: './photorealistic-editor.component.html',
  styleUrls: ['./photorealistic-editor.component.scss']
})
export class PhotorealisticEditorComponent {
  readonly sameAsView = SAME_AS_VIEW;
  readonly modeOptions: { value: RaytraceMode; name: string }[] = [
    { value: 'off', name: 'Off (WebGL view only)' },
    { value: 'view', name: 'In the main view' },
    { value: 'window', name: 'In a separate window' },
  ];
  readonly sampleOptions = [1, 4, 16, 64, 256, 1024, 4096];
  readonly resolutionOptions = [
    { value: 0.25, name: 'Quarter (fastest)' },
    { value: 0.5, name: 'Half' },
    { value: 1, name: 'Full screen resolution' },
  ];
  readonly previewOptions = [
    { value: 1, name: 'None' },
    { value: 2, name: 'Fine (2 x 2 pixel blocks)' },
    { value: 4, name: 'Medium (4 x 4 pixel blocks)' },
    { value: 8, name: 'Coarse (8 x 8 pixel blocks)' },
  ];
  readonly shadowOptions: { value: RaytraceSettings['shadows']; name: string }[] = [
    { value: 'all', name: 'From every object and light' },
    { value: 'castShadow', name: 'Only where Cast shadow is set, as in WebGL' },
    { value: 'none', name: 'None' },
  ];
  readonly toneMappingOptions: { value: number | typeof SAME_AS_VIEW; name: string }[] = [
    { value: SAME_AS_VIEW, name: 'Same as the main view (Reinhard)' },
    { value: THREE.NoToneMapping, name: 'None' },
    { value: THREE.LinearToneMapping, name: 'Linear' },
    { value: THREE.ReinhardToneMapping, name: 'Reinhard' },
    { value: THREE.CineonToneMapping, name: 'Cineon' },
    { value: THREE.ACESFilmicToneMapping, name: 'ACES Filmic' },
    { value: THREE.AgXToneMapping, name: 'AgX' },
    { value: THREE.NeutralToneMapping, name: 'Neutral' },
  ];
  readonly colorSpaceOptions = [
    { value: SAME_AS_VIEW, name: 'Same as the main view (linear)' },
    { value: THREE.SRGBColorSpace, name: 'sRGB' },
    { value: THREE.LinearSRGBColorSpace, name: 'Linear' },
  ];
  readonly backgroundOptions: { value: RaytraceSettings['background']; name: string }[] = [
    { value: 'view', name: "The view's background" },
    { value: 'colour', name: 'Colour' },
  ];

  constructor(public raytrace: RaytraceService, changeDetector: ChangeDetectorRef, destroyRef: DestroyRef) {
    // The mode can change outside this tab, such as by the Z shortcut or by closing the window.
    const subscription = raytrace.changed.subscribe(() => changeDetector.markForCheck());
    destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  get settings(): RaytraceSettings {
    return this.raytrace.settings;
  }

  get active(): boolean {
    return this.raytrace.mode !== 'off';
  }

  /** Exposure only changes the image when some tone mapping is applied. */
  get exposureApplies(): boolean {
    return this.settings.toneMapping !== THREE.NoToneMapping;
  }

  describe = describeProgress;

  onModeChange(mode: RaytraceMode): void {
    this.raytrace.setMode(mode);
  }

  /** Applies a changed setting. */
  onChange(): void {
    this.raytrace.update();
  }

  onBackgroundColourChange(colour: string): void {
    this.settings.backgroundColour = colour;
    this.onChange();
  }

  onRestart(): void {
    this.raytrace.restart();
  }

  onStop(): void {
    this.raytrace.stop();
  }

  onSave(): void {
    this.raytrace.saveImage();
  }

  onReset(): void {
    this.raytrace.resetSettings();
  }
}
