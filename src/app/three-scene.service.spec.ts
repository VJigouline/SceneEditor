import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import * as THREE from 'three';

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

  describe('toFileEntries', () => {
    it('wraps a file so it reads back as the same file', (done) => {
      const file = new File(['[]'], 'empty.polygons');

      const [opened] = service.toFileEntries([file]);

      expect(opened.relativePath).toBe('empty.polygons');
      expect(opened.fileEntry.isFile).toBeTrue();
      (opened.fileEntry as FileSystemFileEntry).file(read => {
        expect(read).toBe(file);
        done();
      });
    });

    it('loads an opened model', (done) => {
      service.addFiles(service.toFileEntries([new File(['[]'], 'empty.polygons')]), () => {
        expect(spinner.show).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('reports an opened file that is not a model', () => {
      service.addFiles(service.toFileEntries([new File([''], 'photo.png')]), () => fail('nothing was loaded'));

      expect(spinner.show).not.toHaveBeenCalled();
      expect((dialog.open.calls.mostRecent().args[1].data as any).message).toBe('photo.png');
    });
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

  describe('rescaleScene', () => {
    beforeEach(() => {
      service.orbitControls = { target: new THREE.Vector3(), update: () => true } as any;
      // A 2 x 2 x 2 cube, whose bounding sphere has a radius of the square root of 3.
      service.getScene().add(new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2)));
    });

    it('fits the view to the box', () => {
      service.camera = new THREE.OrthographicCamera(-200, 200, 100, -100);

      service.rescaleScene();

      expect(service.camera.zoom).toBeCloseTo(100 / Math.sqrt(3));
      expect(service.refitIfPending()).toBeFalse();
    });

    it('fits again once a view that had no size gets one', () => {
      // Before the page is laid out, the view can have no height.
      service.camera = new THREE.OrthographicCamera(-200, 200, 0, 0);

      service.rescaleScene();

      expect(service.camera.zoom).toBe(1);
      service.camera.top = 100;
      service.camera.bottom = -100;
      expect(service.refitIfPending()).toBeTrue();
      expect(service.camera.zoom).toBeCloseTo(100 / Math.sqrt(3));
      expect(service.refitIfPending()).toBeFalse();
    });
  });

  describe('Ogre files', () => {
    const triangle = (material: string) => `<mesh>
      <sharedgeometry vertexcount="3"><vertexbuffer positions="true">
        <vertex><position x="0" y="0" z="0"/></vertex>
        <vertex><position x="1" y="0" z="0"/></vertex>
        <vertex><position x="0" y="1" z="0"/></vertex>
      </vertexbuffer></sharedgeometry>
      <submeshes><submesh material="${material}" usesharedvertices="true">
        <faces count="1"><face v1="0" v2="1" v3="2"/></faces>
      </submesh></submeshes>
    </mesh>`;
    const material = 'material Red\n{\n technique\n {\n  pass\n  {\n   diffuse 1 0 0\n  }\n }\n}\n';
    const dotScene = `<scene><nodes>
      <node name="A"><entity name="First" meshFile="tri.mesh"/></node>
      <node name="B"><position x="2" y="0" z="0"/><entity name="Second" meshFile="tri.mesh"/></node>
    </nodes></scene>`;
    const ogreGroups = () => service.getScene().children.filter(c => c.userData.ogre?.kind === 'scene');

    it('loads a scene once, with the meshes and materials beside it', (done) => {
      const files = [entry('ogre/tri.mesh.xml', triangle('Red')), entry('ogre/house.scene', dotScene), entry('ogre/red.material', material)];

      service.addFiles(files, () => {
        expect(spinner.show).toHaveBeenCalledTimes(1);
        expect(dialog.open).not.toHaveBeenCalled();
        const groups = ogreGroups();
        expect(groups.length).toBe(1);
        expect(groups[0].name).toBe('ogre/house.scene');
        const first = groups[0].getObjectByName('First') as any;
        expect(first.material.name).toBe('Red');
        expect(first.material.color.r).toBeCloseTo(1);
        expect(groups[0].getObjectByName('Second')).toBeTruthy();
        done();
      });
    });

    it('loads a mesh with its material script', (done) => {
      service.addFiles([entry('tri.mesh.xml', triangle('Red')), entry('red.material', material)], () => {
        const groups = ogreGroups();
        expect(groups.length).toBe(1);
        expect((groups[0].children[0] as any).material.name).toBe('Red');
        done();
      });
    });

    it('reports a scene whose meshes are missing', (done) => {
      spinner.hide.and.callFake((() => {
        setTimeout(() => {
          expect((dialog.open.calls.mostRecent().args[1].data as any).message).toContain('tri.mesh');
          done();
        });
        return Promise.resolve();
      }) as any);

      service.addFiles([entry('house.scene', dotScene)], () => fail('the load failed'));
    });

    it('does not treat other XML files as models', () => {
      service.addFiles([entry('settings.xml', '<settings/>')], () => fail('nothing was loaded'));

      expect(spinner.show).not.toHaveBeenCalled();
      expect(dialog.open).toHaveBeenCalledTimes(1);
    });
  });
});
