import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpotLightEditorComponent } from './spot-light-editor.component';

describe('SpotLightEditorComponent', () => {
  let component: SpotLightEditorComponent;
  let fixture: ComponentFixture<SpotLightEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotLightEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotLightEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
