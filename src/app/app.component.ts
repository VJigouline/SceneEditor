import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ThreeJS Scene Editor';

  Width: number;
  Height: number;

  ngOnInit() {
    // console.log('OnInit.');
    this.onResize();
  }

  @HostListener('window:resize', [])
  private onResize(): void {
    // console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
    this.Width = window.innerWidth;
    this.Height = window.innerHeight;
    // console.log(`Width: ${this.Width}, Height: ${this.Height}`);
  }
}
