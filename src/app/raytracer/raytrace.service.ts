import { Injectable, NgZone } from '@angular/core';
import { saveAs } from 'file-saver';
import { RaytracingRenderer, type RaytracingProgress } from 'meercad-raytracer';
import { BehaviorSubject, Subject } from 'rxjs';
import * as THREE from 'three';

/**
 * Owns the ray traced view: a RaytracingRenderer whose canvas lies over the WebGL canvas, and
 * the settings the Scene tab edits. The WebGL canvas stays underneath and keeps receiving the
 * mouse, so orbiting, panning and selection work the same in both views.
 */
@Injectable({
  providedIn: 'root'
})
export class RaytraceService {
  /** Ray trace the view instead of drawing it with WebGL. */
  enabled = false;
  samples = 64;
  shadows = true;
  globalIllumination = false;
  maxBounces = 4;

  readonly progress = new BehaviorSubject<RaytracingProgress>({ samples: 0, maxSamples: 0, done: true });
  /** Emits when a setting changes and the view should be drawn again. */
  readonly changed = new Subject<void>();

  private renderer: RaytracingRenderer | null = null;

  constructor(private zone: NgZone) { }

  /** Creates the ray tracing canvas over the WebGL renderer's canvas. */
  attach(container: HTMLElement, webgl: THREE.WebGLRenderer): void {
    if (this.renderer) { return; }
    // Outside Angular's zone, so worker messages don't run change detection for every tile.
    this.zone.runOutsideAngular(() => {
      const renderer = new RaytracingRenderer({
        workerFactory: () => new Worker(new URL('./raytracer.worker', import.meta.url), { type: 'module' }),
        previewBlock: 4,
      });
      renderer.copySettingsFrom(webgl);
      const style = renderer.domElement.style;
      style.position = 'absolute';
      style.left = '0';
      style.top = '0';
      style.pointerEvents = 'none';
      style.display = 'none';
      container.style.position = 'relative';
      container.appendChild(renderer.domElement);
      renderer.onProgress(progress => this.zone.run(() => this.progress.next(progress)));
      this.renderer = renderer;
    });
  }

  setSize(width: number, height: number): void {
    this.renderer?.setSize(width, height);
  }

  /** Starts ray tracing the scene, restarting any render in progress. */
  render(scene: THREE.Scene, camera: THREE.Camera): void {
    const renderer = this.renderer;
    if (!renderer) { return; }
    renderer.domElement.style.display = '';
    renderer.samples = this.samples;
    renderer.shadows = this.shadows ? 'all' : 'none';
    renderer.globalIllumination = this.globalIllumination;
    renderer.maxBounces = this.maxBounces;
    this.zone.runOutsideAngular(() => renderer.render(scene, camera));
  }

  /** Stops ray tracing and hides the ray traced canvas. */
  hide(): void {
    if (!this.renderer) { return; }
    this.renderer.stop();
    this.renderer.domElement.style.display = 'none';
    this.progress.next({ samples: 0, maxSamples: 0, done: true });
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.changed.next();
  }

  /** Applies changed settings by drawing the view again. */
  update(): void {
    this.changed.next();
  }

  /** Downloads the ray traced image as it is now, as a PNG. */
  saveImage(): void {
    this.renderer?.domElement.toBlob(blob => {
      if (blob) { saveAs(blob, 'raytraced.png'); }
    }, 'image/png');
  }
}
