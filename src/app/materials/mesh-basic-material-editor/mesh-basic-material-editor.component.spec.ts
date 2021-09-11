import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeshBasicMaterialEditorComponent } from './mesh-basic-material-editor.component';

describe('MeshBasicMaterialEditorComponent', () => {
  let component: MeshBasicMaterialEditorComponent;
  let fixture: ComponentFixture<MeshBasicMaterialEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshBasicMaterialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshBasicMaterialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
