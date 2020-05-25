import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshDepthMaterialEditorComponent } from './mesh-depth-material-editor.component';

describe('MeshDepthMaterialEditorComponent', () => {
  let component: MeshDepthMaterialEditorComponent;
  let fixture: ComponentFixture<MeshDepthMaterialEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshDepthMaterialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshDepthMaterialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
