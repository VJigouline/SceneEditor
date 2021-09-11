import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HemisphereLightEditorComponent } from './hemisphere-light-editor.component';

describe('HemisphereLightEditorComponent', () => {
  let component: HemisphereLightEditorComponent;
  let fixture: ComponentFixture<HemisphereLightEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HemisphereLightEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HemisphereLightEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
