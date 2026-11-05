import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import { RaytracingRenderer, type RaytracingProgress } from 'meercad-raytracer';
import { BehaviorSubject, Subject } from 'rxjs';
import * as THREE from 'three';
import { ErrorDialogComponent } from '../user-controls/error-dialog/error-dialog.component';

/** Where the ray traced image is shown. */
export type RaytraceMode = 'off' | 'view' | 'window';

/** Tone mapping or colour space value that means "as the main view". */
export const SAME_AS_VIEW = 'view';

export interface RaytraceSettings {
  /** Samples per pixel to stop at. */
  samples: number;
  /** Reflection, refraction and bounce depth. */
  maxBounces: number;
  /** Image resolution as a fraction of the screen's pixels. */
  resolution: number;
  /** Block size of the quick first preview, 1 for none. */
  previewBlock: number;
  /** Worker threads tracing in parallel. */
  workers: number;
  shadows: 'all' | 'castShadow' | 'none';
  globalIllumination: boolean;
  /** A three.js tone mapping constant, or SAME_AS_VIEW. */
  toneMapping: number | typeof SAME_AS_VIEW;
  exposure: number;
  /** 'srgb', 'srgb-linear' or SAME_AS_VIEW. */
  colorSpace: string;
  /** Show the view's background through the image, or fill it with backgroundColour. */
  background: 'view' | 'colour';
  /** CSS hex colour. */
  backgroundColour: string;
  /** In the separate window, keep the view's proportions instead of stretching to the window. */
  keepProportions: boolean;
}

export function defaultRaytraceSettings(): RaytraceSettings {
  const cores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4;
  return {
    samples: 64,
    maxBounces: 4,
    resolution: 1,
    previewBlock: 4,
    workers: Math.max(1, Math.min(8, cores - 1)),
    shadows: 'all',
    globalIllumination: false,
    toneMapping: SAME_AS_VIEW,
    exposure: 1,
    colorSpace: SAME_AS_VIEW,
    background: 'view',
    backgroundColour: '#ffffff',
    keepProportions: true,
  };
}

/** The view's CSS background, also used behind the image in the separate window. */
const VIEW_BACKGROUND = 'linear-gradient(200deg, rgb(100 149 237), transparent)';
const STATUS_HEIGHT = 24;

/**
 * Owns ray tracing for the editor: one RaytracingRenderer and its workers, which draw either
 * into a canvas over the main view or into a canvas in a separate browser window, and the
 * settings the Photorealistic tab edits.
 *
 * In the main view, the ray traced canvas lies over the WebGL canvas with pointer events off,
 * so orbiting, panning and selection keep working on the WebGL canvas underneath.
 */
@Injectable({
  providedIn: 'root'
})
export class RaytraceService {
  mode: RaytraceMode = 'off';
  settings: RaytraceSettings = defaultRaytraceSettings();
  /** Most workers the settings may ask for. */
  readonly maxWorkers = Math.max(1, typeof navigator !== 'undefined' && navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4);

  readonly progress = new BehaviorSubject<RaytracingProgress>({ samples: 0, maxSamples: 0, done: true, stopped: false, elapsed: 0 });
  /** Emits when the view should be drawn again: the mode or a setting changed. */
  readonly changed = new Subject<void>();

  private renderer: RaytracingRenderer | null = null;
  private rendererWorkers = 0;
  private webgl: THREE.WebGLRenderer | null = null;
  private overlay: HTMLCanvasElement | null = null;
  private viewSize = { width: 0, height: 0 };
  private popup: Window | null = null;
  private popupCanvas: HTMLCanvasElement | null = null;
  private popupStatus: HTMLElement | null = null;
  private last: { scene: THREE.Scene; camera: THREE.Camera } | null = null;

  constructor(private zone: NgZone, private dialog: MatDialog) {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.closePopup());
    }
  }

  /** Puts the canvas for ray tracing in the main view over the WebGL renderer's canvas. */
  attach(container: HTMLElement, webgl: THREE.WebGLRenderer): void {
    if (this.overlay) { return; }
    this.webgl = webgl;
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, { position: 'absolute', left: '0', top: '0', pointerEvents: 'none', display: 'none' });
    container.style.position = 'relative';
    container.appendChild(canvas);
    this.overlay = canvas;
  }

  /** Size of the main view in CSS pixels. */
  setViewSize(width: number, height: number): void {
    this.viewSize = { width, height };
    if (this.mode === 'view' && this.renderer) { this.renderer.setSize(width, height); }
  }

  /**
   * Switches between the two views, as Z does: the three.js view, and the ray traced image in
   * the main view. From the separate window, it goes back to the three.js view.
   */
  toggleView(): void {
    this.setMode(this.mode === 'off' ? 'view' : 'off');
  }

  /**
   * Handles the Z shortcut for a keydown event, returning true when it switched the view.
   * Z with Ctrl, Cmd or Alt, such as Ctrl+Z for undo, and Z typed into a text field or a list
   * are left alone.
   */
  handleShortcut(event: KeyboardEvent): boolean {
    if (event.key !== 'z' && event.key !== 'Z') { return false; }
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.defaultPrevented) { return false; }
    const target = event.target as Element | null;
    if (target && typeof target.closest === 'function' &&
        target.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"], mat-select, [role="combobox"], [role="listbox"], [role="option"]')) {
      return false;
    }
    event.preventDefault();
    this.toggleView();
    return true;
  }

  /**
   * Shows ray tracing in the main view, in a separate window, or turns it off. Opening the
   * window must happen in response to a click, or the browser may block it.
   */
  setMode(mode: RaytraceMode): void {
    if (mode === this.mode) { return; }
    if (mode !== 'window') { this.closePopup(); }
    if (mode === 'off') {
      this.renderer?.stop();
      this.showOverlay(false);
      this.mode = 'off';
      this.progress.next({ samples: 0, maxSamples: 0, done: true, stopped: false, elapsed: 0 });
      this.changed.next();
      return;
    }
    if (mode === 'window' && !this.openPopup()) {
      this.dialog.open(ErrorDialogComponent, {
        width: '350px',
        data: {
          title: 'Window blocked',
          label: 'The browser blocked the ray tracing window. ',
          message: 'Allow pop-up windows for this site, then try again.',
          close: true
        }
      });
      return;
    }
    this.mode = mode;
    const renderer = this.ensureRenderer();
    if (mode === 'view') {
      renderer.setCanvas(this.overlay!);
      this.showOverlay(true);
      this.applyPixelRatio(window.devicePixelRatio);
      renderer.setSize(this.viewSize.width, this.viewSize.height);
    } else {
      this.showOverlay(false);
      renderer.setCanvas(this.popupCanvas!);
      this.applyPixelRatio(this.popup!.devicePixelRatio);
      this.fitPopup();
    }
    this.changed.next();
  }

  /** Applies changed settings and starts the image again. */
  update(): void {
    if (this.renderer && this.rendererWorkers !== this.settings.workers) {
      // A different number of workers needs a new renderer; it takes over the current canvas.
      const canvas = this.renderer.domElement;
      const size = this.renderer.getSize();
      this.renderer.dispose();
      this.renderer = null;
      const renderer = this.ensureRenderer(canvas);
      renderer.setSize(size.x, size.y);
    }
    if (this.renderer) {
      this.applyPixelRatio(this.mode === 'window' && this.popup ? this.popup.devicePixelRatio : window.devicePixelRatio);
    }
    this.changed.next();
  }

  /** Puts every setting back to its default. */
  resetSettings(): void {
    this.settings = defaultRaytraceSettings();
    this.update();
  }

  /** Starts ray tracing the scene, restarting any render in progress. Does nothing when off. */
  render(scene: THREE.Scene, camera: THREE.Camera): void {
    if (this.mode === 'off' || !this.renderer) { return; }
    this.last = { scene, camera };
    const renderer = this.renderer;
    const s = this.settings;
    renderer.samples = s.samples;
    renderer.maxBounces = s.maxBounces;
    renderer.previewBlock = s.previewBlock;
    renderer.shadows = s.shadows;
    renderer.globalIllumination = s.globalIllumination;
    renderer.fitAspect = this.mode === 'window' && s.keepProportions;
    const webgl = this.webgl;
    renderer.toneMapping = s.toneMapping === SAME_AS_VIEW ? (webgl?.toneMapping ?? THREE.NoToneMapping) : s.toneMapping;
    renderer.toneMappingExposure = s.exposure;
    renderer.outputColorSpace = s.colorSpace === SAME_AS_VIEW ? (webgl?.outputColorSpace ?? THREE.SRGBColorSpace) : s.colorSpace;
    if (s.background === 'colour') {
      renderer.setClearColor(new THREE.Color(s.backgroundColour), 1);
    } else if (webgl) {
      renderer.setClearColor(webgl.getClearColor(new THREE.Color()), webgl.getClearAlpha());
    }
    this.zone.runOutsideAngular(() => renderer.render(scene, camera));
  }

  /** Starts the image again from the preview. */
  restart(): void {
    if (this.last) { this.render(this.last.scene, this.last.camera); }
  }

  /** Stops tracing; the image keeps what has been drawn. */
  stop(): void {
    this.renderer?.stop();
  }

  /** Downloads the ray traced image as it is now, as a PNG. */
  saveImage(): void {
    this.renderer?.domElement.toBlob(blob => {
      if (blob) { saveAs(blob, 'raytraced.png'); }
    }, 'image/png');
  }

  private ensureRenderer(canvas?: HTMLCanvasElement): RaytracingRenderer {
    if (this.renderer) { return this.renderer; }
    const workers = this.settings.workers;
    // Outside Angular's zone, so worker messages don't run change detection for every tile.
    this.renderer = this.zone.runOutsideAngular(() => {
      const renderer = new RaytracingRenderer({
        canvas: canvas ?? this.overlay ?? undefined,
        workerFactory: () => new Worker(new URL('./raytracer.worker', import.meta.url), { type: 'module' }),
        workers,
      });
      renderer.onProgress(progress => {
        this.updatePopupStatus(progress);
        this.zone.run(() => this.progress.next(progress));
      });
      return renderer;
    });
    this.rendererWorkers = workers;
    return this.renderer;
  }

  private applyPixelRatio(devicePixelRatio: number): void {
    const ratio = this.settings.resolution * (devicePixelRatio || 1);
    if (this.renderer && this.renderer.getPixelRatio() !== ratio) { this.renderer.setPixelRatio(ratio); }
  }

  private showOverlay(show: boolean): void {
    if (!this.overlay) { return; }
    this.overlay.style.display = show ? '' : 'none';
    if (!show) { this.overlay.getContext('2d')?.clearRect(0, 0, this.overlay.width, this.overlay.height); }
  }

  /** Opens, or reuses, the separate window with a full-window canvas and a status line. */
  private openPopup(): boolean {
    if (this.popup && !this.popup.closed) {
      this.popup.focus();
      return true;
    }
    const width = Math.max(320, Math.round(this.viewSize.width * 0.8));
    const height = Math.max(240, Math.round(this.viewSize.height * 0.8) + STATUS_HEIGHT);
    const popup = window.open('', 'sceneeditor-raytrace', `popup,width=${width},height=${height}`);
    if (!popup) { return false; }
    const doc = popup.document;
    doc.title = 'SceneEditor ray traced view';
    doc.body.innerHTML = '';
    Object.assign(doc.body.style, { margin: '0', overflow: 'hidden', fontFamily: 'Roboto, "Helvetica Neue", sans-serif' });
    const canvas = doc.createElement('canvas');
    Object.assign(canvas.style, { display: 'block', background: VIEW_BACKGROUND });
    const status = doc.createElement('div');
    Object.assign(status.style, {
      height: `${STATUS_HEIGHT}px`, lineHeight: `${STATUS_HEIGHT}px`, padding: '0 8px', fontSize: '12px',
      background: '#f5f5f5', borderTop: '1px solid #ddd', boxSizing: 'border-box'
    });
    doc.body.append(canvas, status);
    // Z in the separate window switches back to the three.js view, as it does in the editor.
    popup.addEventListener('keydown', event => this.zone.run(() => this.handleShortcut(event)));
    this.popup = popup;
    this.popupCanvas = canvas;
    this.popupStatus = status;
    popup.addEventListener('resize', () => {
      this.fitPopup();
      this.zone.run(() => this.changed.next());
    });
    // The user closing the window turns ray tracing off.
    popup.addEventListener('pagehide', () => {
      if (this.popup === popup) {
        this.popup = null;
        this.popupCanvas = this.popupStatus = null;
        if (this.mode === 'window') { this.zone.run(() => this.setMode('off')); }
      }
    });
    return true;
  }

  private fitPopup(): void {
    if (!this.popup || !this.renderer || this.mode !== 'window') { return; }
    this.renderer.setSize(this.popup.innerWidth, Math.max(1, this.popup.innerHeight - STATUS_HEIGHT));
  }

  private closePopup(): void {
    const popup = this.popup;
    this.popup = null;
    this.popupCanvas = this.popupStatus = null;
    if (popup && !popup.closed) { popup.close(); }
  }

  private updatePopupStatus(progress: RaytracingProgress): void {
    if (!this.popupStatus || this.mode !== 'window') { return; }
    this.popupStatus.textContent = describeProgress(progress);
    if (this.popup) { this.popup.document.title = `${progress.samples}/${progress.maxSamples} - SceneEditor ray traced view`; }
  }
}

/** One line of progress, such as "Tracing: 12 of 64 samples, 3.4 s", or why tracing failed. */
export function describeProgress(progress: RaytracingProgress): string {
  if (progress.error) { return `Ray tracing failed: ${progress.error}`; }
  const state = progress.done ? 'Done' : progress.stopped ? 'Stopped' : 'Tracing';
  const seconds = (progress.elapsed / 1000).toFixed(1);
  return `${state}: ${progress.samples} of ${progress.maxSamples} samples, ${seconds} s`;
}
