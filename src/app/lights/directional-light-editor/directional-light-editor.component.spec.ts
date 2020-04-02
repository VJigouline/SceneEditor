import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionalLightEditorComponent } from './directional-light-editor.component';

describe('DirectionalLightEditorComponent', () => {
  let component: DirectionalLightEditorComponent;
  let fixture: ComponentFixture<DirectionalLightEditorComponent>;

  beforeEach(async(() => {
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
