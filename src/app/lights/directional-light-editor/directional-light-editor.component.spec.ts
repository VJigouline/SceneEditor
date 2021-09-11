import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DirectionalLightEditorComponent } from './directional-light-editor.component';

describe('DirectionalLightEditorComponent', () => {
  let component: DirectionalLightEditorComponent;
  let fixture: ComponentFixture<DirectionalLightEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionalLightEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionalLightEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
