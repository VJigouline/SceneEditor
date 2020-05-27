import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshNormalMaterialEditorComponent } from './mesh-normal-material-editor.component';

describe('MeshNormalMaterialEditorComponent', () => {
  let component: MeshNormalMaterialEditorComponent;
  let fixture: ComponentFixture<MeshNormalMaterialEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshNormalMaterialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshNormalMaterialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
