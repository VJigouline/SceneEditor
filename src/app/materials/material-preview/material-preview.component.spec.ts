import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPreviewComponent } from './material-preview.component';

describe('MaterialPreviewComponent', () => {
  let component: MaterialPreviewComponent;
  let fixture: ComponentFixture<MaterialPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
