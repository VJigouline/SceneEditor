import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshLambertMaterialEditorComponent } from './mesh-lambert-material-editor.component';

describe('MeshLambertMaterialEditorComponent', () => {
  let component: MeshLambertMaterialEditorComponent;
  let fixture: ComponentFixture<MeshLambertMaterialEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshLambertMaterialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshLambertMaterialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
