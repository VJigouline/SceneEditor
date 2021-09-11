import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SceneEditorComponent } from './scene-editor.component';

describe('SceneEditorComponent', () => {
  let component: SceneEditorComponent;
  let fixture: ComponentFixture<SceneEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
