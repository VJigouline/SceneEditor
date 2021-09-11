import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MeshStandardMaterialEditorComponent } from './mesh-standard-material-editor.component';

describe('MeshStandardMaterialEditorComponent', () => {
  let component: MeshStandardMaterialEditorComponent;
  let fixture: ComponentFixture<MeshStandardMaterialEditorComponent>;

  beforeEach(waitForAsync(() => {
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
