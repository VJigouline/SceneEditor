import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMaterialEditorComponent } from './base-material-editor.component';

describe('BaseMaterialEditorComponent', () => {
  let component: BaseMaterialEditorComponent;
  let fixture: ComponentFixture<BaseMaterialEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseMaterialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseMaterialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
