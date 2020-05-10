import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextureEditorComponent } from './texture-editor.component';

describe('TextureEditorComponent', () => {
  let component: TextureEditorComponent;
  let fixture: ComponentFixture<TextureEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextureEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextureEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
