import { Directive, ElementRef, EventEmitter, NgModule, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

export interface ResizedEvent {
  newWidth: number;
  newHeight: number;
  oldWidth: number | undefined;
  oldHeight: number | undefined;
}

/**
 * Emits when the size of the host element changes.
 * Replaces the angular-resize-event package, which does not support Angular 15+.
 */
@Directive({
  selector: '[resized]',
  standalone: false
})
export class ResizedDirective implements OnInit, OnDestroy {
  @Output() readonly resized = new EventEmitter<ResizedEvent>();

  private observer: ResizeObserver | undefined;
  private oldWidth: number | undefined;
  private oldHeight: number | undefined;

  constructor(private readonly element: ElementRef<HTMLElement>, private readonly zone: NgZone) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.observer = new ResizeObserver(() => this.onResize());
      this.observer.observe(this.element.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private onResize(): void {
    const rect = this.element.nativeElement.getBoundingClientRect();
    if (rect.width === this.oldWidth && rect.height === this.oldHeight) {
      return;
    }
    const event: ResizedEvent = {
      newWidth: rect.width,
      newHeight: rect.height,
      oldWidth: this.oldWidth,
      oldHeight: this.oldHeight
    };
    this.oldWidth = rect.width;
    this.oldHeight = rect.height;
    this.zone.run(() => this.resized.emit(event));
  }
}

@NgModule({
  declarations: [ResizedDirective],
  exports: [ResizedDirective]
})
export class ResizedModule { }
