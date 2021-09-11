import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CubeMapDialogComponent } from './cube-map-dialog.component';

describe('CubeMapDialogComponent', () => {
  let component: CubeMapDialogComponent;
  let fixture: ComponentFixture<CubeMapDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CubeMapDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubeMapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
