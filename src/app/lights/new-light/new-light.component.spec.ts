import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLightComponent } from './new-light.component';

describe('NewLightComponent', () => {
  let component: NewLightComponent;
  let fixture: ComponentFixture<NewLightComponent>;

  beforeEach(async(() => {
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
