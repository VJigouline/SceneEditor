import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LightsLibraryEditorComponent } from './lights-library-editor.component';

describe('LightsLibraryEditorComponent', () => {
  let component: LightsLibraryEditorComponent;
  let fixture: ComponentFixture<LightsLibraryEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LightsLibraryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightsLibraryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
