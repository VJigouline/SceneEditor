import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightEditorComponent } from './light-editor.component';

describe('LightEditorComponent', () => {
  let component: LightEditorComponent;
  let fixture: ComponentFixture<LightEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
