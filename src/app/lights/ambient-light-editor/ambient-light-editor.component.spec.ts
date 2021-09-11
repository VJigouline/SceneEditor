import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AmbientLightEditorComponent } from './ambient-light-editor.component';

describe('AmbientLightEditorComponent', () => {
  let component: AmbientLightEditorComponent;
  let fixture: ComponentFixture<AmbientLightEditorComponent>;

  beforeEach(waitForAsync(() => {
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
