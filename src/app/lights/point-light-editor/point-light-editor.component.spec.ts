import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PointLightEditorComponent } from './point-light-editor.component';

describe('PointLightEditorComponent', () => {
  let component: PointLightEditorComponent;
  let fixture: ComponentFixture<PointLightEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PointLightEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointLightEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
