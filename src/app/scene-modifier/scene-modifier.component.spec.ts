import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SceneModifierComponent } from './scene-modifier.component';

describe('SceneModifierComponent', () => {
  let component: SceneModifierComponent;
  let fixture: ComponentFixture<SceneModifierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
