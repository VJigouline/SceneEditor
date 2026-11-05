import { Component, HostListener, OnInit, ViewContainerRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ThreeJS Scene Editor';

  Width: number;
  Height: number;

  // vcRef is read by name by ngx-color-picker's cpUseRootViewContainer option.
  constructor(private spinner : NgxSpinnerService, public vcRef: ViewContainerRef) {}

  ngOnInit() {
    // console.log('OnInit.');
    this.onResize();
    this.spinner.show();
  }

  @HostListener('window:resize', [])
  private onResize(): void {
    // console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
    this.Width = window.innerWidth;
    this.Height = window.innerHeight;
    // console.log(`Width: ${this.Width}, Height: ${this.Height}`);
  }
}
