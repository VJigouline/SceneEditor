import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewLightComponent } from './new-light.component';

describe('NewLightComponent', () => {
  let component: NewLightComponent;
  let fixture: ComponentFixture<NewLightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
