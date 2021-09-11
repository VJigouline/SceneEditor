import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SceneSaverComponent } from './scene-saver.component';

describe('SceneSaverComponent', () => {
  let component: SceneSaverComponent;
  let fixture: ComponentFixture<SceneSaverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneSaverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
