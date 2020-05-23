import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshPhongMaterialEditorComponent } from './mesh-phong-material-editor.component';

describe('MeshPhongMaterialEditorComponent', () => {
  let component: MeshPhongMaterialEditorComponent;
  let fixture: ComponentFixture<MeshPhongMaterialEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshPhongMaterialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshPhongMaterialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
