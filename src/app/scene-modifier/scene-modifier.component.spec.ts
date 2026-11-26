import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ThreeSceneService } from '../three-scene.service';
import { SceneModifierComponent } from './scene-modifier.component';

describe('SceneModifierComponent', () => {
  let component: SceneModifierComponent;
  let fixture: ComponentFixture<SceneModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SceneModifierComponent],
      imports: [FormsModule],
      // The template's Material elements are not under test.
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ThreeSceneService, useValue: {} }]
    }).compileComponents();
    fixture = TestBed.createComponent(SceneModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the URL field only when asked', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('input[type=url]')).toBeNull();
    component.onToggleUrl();
    fixture.detectChanges();
    expect(element.querySelector('input[type=url]')).not.toBeNull();
    component.onToggleUrl();
    fixture.detectChanges();
    expect(element.querySelector('input[type=url]')).toBeNull();
  });

  it('opens the URL typed, without the spaces around it', () => {
    const opened: string[] = [];
    component.urlOpened.subscribe(url => opened.push(url));
    component.url = '   ';
    component.onOpenUrl();
    component.url = ' https://example.com/model.glb ';
    component.onOpenUrl();
    expect(opened).toEqual(['https://example.com/model.glb']);
  });
});
