import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RectareaLightEditorComponent } from './rectarea-light-editor.component';

describe('RectareaLightEditorComponent', () => {
  let component: RectareaLightEditorComponent;
  let fixture: ComponentFixture<RectareaLightEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RectareaLightEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectareaLightEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
