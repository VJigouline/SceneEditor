import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Point3DComponent } from './point3-d.component';

describe('Point3DComponent', () => {
  let component: Point3DComponent;
  let fixture: ComponentFixture<Point3DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Point3DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Point3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
