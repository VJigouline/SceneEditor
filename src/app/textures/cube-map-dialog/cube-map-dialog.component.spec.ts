import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CubeMapDialogComponent } from './cube-map-dialog.component';

describe('CubeMapDialogComponent', () => {
  let component: CubeMapDialogComponent;
  let fixture: ComponentFixture<CubeMapDialogComponent>;

  beforeEach(async(() => {
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
