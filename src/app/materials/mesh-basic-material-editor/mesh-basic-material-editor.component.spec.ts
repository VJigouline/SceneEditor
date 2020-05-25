import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshBasicMaterialEditorComponent } from './mesh-basic-material-editor.component';

describe('MeshBasicMaterialEditorComponent', () => {
  let component: MeshBasicMaterialEditorComponent;
  let fixture: ComponentFixture<MeshBasicMaterialEditorComponent>;

  beforeEach(async(() => {
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
