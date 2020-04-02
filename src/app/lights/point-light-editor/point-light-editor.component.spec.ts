import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointLightEditorComponent } from './point-light-editor.component';

describe('PointLightEditorComponent', () => {
  let component: PointLightEditorComponent;
  let fixture: ComponentFixture<PointLightEditorComponent>;

  beforeEach(async(() => {
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
