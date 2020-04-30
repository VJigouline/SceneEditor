import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshStandardMaterialEditorComponent } from './mesh-standard-material-editor.component';

describe('MeshStandardMaterialEditorComponent', () => {
  let component: MeshStandardMaterialEditorComponent;
  let fixture: ComponentFixture<MeshStandardMaterialEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshStandardMaterialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshStandardMaterialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
