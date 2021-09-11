import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeshMatcapMaterialEditorComponent } from './mesh-matcap-material-editor.component';

describe('MeshMatcapMaterialEditorComponent', () => {
  let component: MeshMatcapMaterialEditorComponent;
  let fixture: ComponentFixture<MeshMatcapMaterialEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshMatcapMaterialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshMatcapMaterialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
