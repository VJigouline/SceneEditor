import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsLibraryEditorComponent } from './materials-library-editor.component';

describe('MaterialsLibraryEditorComponent', () => {
  let component: MaterialsLibraryEditorComponent;
  let fixture: ComponentFixture<MaterialsLibraryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialsLibraryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsLibraryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
