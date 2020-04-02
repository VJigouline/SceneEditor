import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HemisphereLightEditorComponent } from './hemisphere-light-editor.component';

describe('HemisphereLightEditorComponent', () => {
  let component: HemisphereLightEditorComponent;
  let fixture: ComponentFixture<HemisphereLightEditorComponent>;

  beforeEach(async(() => {
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
