import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BaseMaterialEditorComponent } from './base-material-editor.component';

describe('BaseMaterialEditorComponent', () => {
  let component: BaseMaterialEditorComponent;
  let fixture: ComponentFixture<BaseMaterialEditorComponent>;

  beforeEach(waitForAsync(() => {
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
