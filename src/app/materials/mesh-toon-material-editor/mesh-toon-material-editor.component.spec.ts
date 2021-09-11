import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeshToonMaterialEditorComponent } from './mesh-toon-material-editor.component';

describe('MeshToonMaterialEditorComponent', () => {
  let component: MeshToonMaterialEditorComponent;
  let fixture: ComponentFixture<MeshToonMaterialEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshToonMaterialEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshToonMaterialEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
