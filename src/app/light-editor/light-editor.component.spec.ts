import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LightEditorComponent } from './light-editor.component';

describe('LightEditorComponent', () => {
  let component: LightEditorComponent;
  let fixture: ComponentFixture<LightEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LightEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
