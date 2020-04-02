import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbientLightEditorComponent } from './ambient-light-editor.component';

describe('AmbientLightEditorComponent', () => {
  let component: AmbientLightEditorComponent;
  let fixture: ComponentFixture<AmbientLightEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbientLightEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbientLightEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
