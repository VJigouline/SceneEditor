import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';

import { ThreeSceneService } from './three-scene.service';

function entry(relativePath: string, content = '', isFile = true): NgxFileDropEntry {
  const name = relativePath.split('/').pop();
  return new NgxFileDropEntry(relativePath, {
    name,
    isFile,
    isDirectory: !isFile,
    file: (callback: (file: File) => void) => callback(new File([content], name))
  } as any);
}

describe('ThreeSceneService', () => {
  let service: ThreeSceneService;
  let spinner: jasmine.SpyObj<NgxSpinnerService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    spinner = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxSpinnerService, useValue: spinner },
        { provide: MatDialog, useValue: dialog }
      ]
    });
    service = TestBed.inject(ThreeSceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addFiles', () => {
    it('does nothing when a drop held only library files', () => {
      service.addFiles([], () => fail('nothing was loaded'));

      expect(spinner.show).not.toHaveBeenCalled();
      expect(dialog.open).not.toHaveBeenCalled();
    });

    for (const name of ['scene.json', 'notes.xyz', 'no-extension']) {
      it(`reports ${name} without showing the spinner`, () => {
        service.addFiles([entry(name)], () => fail('nothing was loaded'));

        expect(spinner.show).not.toHaveBeenCalled();
        expect(dialog.open).toHaveBeenCalledTimes(1);
        expect((dialog.open.calls.mostRecent().args[1].data as any).message).toBe(name);
      });
    }

    it('reports a folder with no models in it', () => {
      service.addFiles([entry('empty', '', false)], () => fail('nothing was loaded'));

      expect(spinner.show).not.toHaveBeenCalled();
      expect(dialog.open).toHaveBeenCalledTimes(1);
    });

    it('shortens a long list of files in the report', () => {
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map(name => entry(name + '.txt'));

      service.addFiles(files, () => fail('nothing was loaded'));

      expect((dialog.open.calls.mostRecent().args[1].data as any).message)
        .toBe('a.txt, b.txt, c.txt, d.txt, e.txt and 2 more');
    });

    it('loads a model and ignores the other files beside it', (done) => {
      const files = [entry('model/notes.txt'), entry('model/empty.polygons', '[]')];

      service.addFiles(files, () => {
        expect(spinner.show).toHaveBeenCalledTimes(1);
        expect(dialog.open).not.toHaveBeenCalled();
        done();
      });
    });

    it('finishes on a polygon file with no polygons', (done) => {
      service.addFiles([entry('empty.polygons', '[]')], () => {
        expect(dialog.open).not.toHaveBeenCalled();
        done();
      });
    });

    for (const [title, content] of [['malformed', '{not json'], ['not a list', '{}'], ['an invalid polygon', '[null]']]) {
      it(`hides the spinner and reports a polygon file that is ${title}`, (done) => {
        spinner.hide.and.callFake((() => {
          expect(dialog.open).not.toHaveBeenCalled();
          setTimeout(() => {
            expect(dialog.open).toHaveBeenCalledTimes(1);
            done();
          });
          return Promise.resolve();
        }) as any);

        service.addFiles([entry('bad.polygons', content)], () => fail('the load failed'));
      });
    }
  });
});
