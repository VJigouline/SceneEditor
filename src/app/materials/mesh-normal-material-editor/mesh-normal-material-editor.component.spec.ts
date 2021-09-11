import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeshNormalMaterialEditorComponent } from './mesh-normal-material-editor.component';

describe('MeshNormalMaterialEditorComponent', () => {
  let component: MeshNormalMaterialEditorComponent;
  let fixture: ComponentFixture<MeshNormalMaterialEditorComponent>;

  beforeEach(waitForAsync(() => {
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
