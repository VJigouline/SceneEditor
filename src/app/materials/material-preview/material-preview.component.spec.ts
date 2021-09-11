import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaterialPreviewComponent } from './material-preview.component';

describe('MaterialPreviewComponent', () => {
  let component: MaterialPreviewComponent;
  let fixture: ComponentFixture<MaterialPreviewComponent>;

  beforeEach(waitForAsync(() => {
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
