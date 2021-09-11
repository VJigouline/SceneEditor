import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SceneViewComponent } from './scene-view.component';

describe('SceneViewComponent', () => {
  let component: SceneViewComponent;
  let fixture: ComponentFixture<SceneViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
