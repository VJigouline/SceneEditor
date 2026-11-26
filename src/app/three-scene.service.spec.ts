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

    for (const name of ['scene.json', 'notes.abc', 'no-extension']) {
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

  describe('DXF files', () => {
    const drawing = ['0', 'SECTION', '2', 'ENTITIES',
      '0', 'LINE', '8', 'Walls', '62', '1', '10', '0', '20', '0', '30', '0', '11', '10', '21', '0', '31', '0',
      '0', 'ENDSEC', '0', 'EOF', ''].join('\n');

    it('loads a drawing, grouped by layer', (done) => {
      service.addFiles([entry('plan.dxf', drawing)], () => {
        expect(dialog.open).not.toHaveBeenCalled();
        const group = service.getScene().children.find(c => c.name === 'plan.dxf');
        expect(group?.children.map(c => c.name)).toEqual(['Walls']);
        done();
      });
    });

    it('reports a file that is not DXF', (done) => {
      spinner.hide.and.callFake((() => {
        setTimeout(() => {
          expect((dialog.open.calls.mostRecent().args[1].data as any).message).toContain('Not a DXF file');
          done();
        });
        return Promise.resolve();
      }) as any);

      service.addFiles([entry('notes.dxf', 'hello\nworld\n')], () => fail('the load failed'));
    });
  });

  describe('Blender files and zips', () => {
    /** A zip with its files stored uncompressed. */
    function zip(files: { name: string; data: string }[]): Uint8Array {
      const out: number[] = [];
      const central: number[] = [];
      const u16 = (a: number[], v: number) => a.push(v & 255, (v >> 8) & 255);
      const u32 = (a: number[], v: number) => a.push(v & 255, (v >> 8) & 255, (v >> 16) & 255, (v >>> 24) & 255);
      for (const file of files) {
        const name = Array.from(new TextEncoder().encode(file.name));
        const data = Array.from(new TextEncoder().encode(file.data));
        const offset = out.length;
        u32(out, 0x04034b50); u16(out, 20); u16(out, 0); u16(out, 0); u16(out, 0); u16(out, 0);
        u32(out, 0); u32(out, data.length); u32(out, data.length); u16(out, name.length); u16(out, 0);
        out.push(...name, ...data);
        u32(central, 0x02014b50); u16(central, 20); u16(central, 20); u16(central, 0); u16(central, 0);
        u16(central, 0); u16(central, 0); u32(central, 0); u32(central, data.length); u32(central, data.length);
        u16(central, name.length); u16(central, 0); u16(central, 0); u16(central, 0); u16(central, 0);
        u32(central, 0); u32(central, offset);
        central.push(...name);
      }
      const start = out.length;
      out.push(...central);
      u32(out, 0x06054b50); u16(out, 0); u16(out, 0); u16(out, files.length); u16(out, files.length);
      u32(out, central.length); u32(out, start); u16(out, 0);
      return Uint8Array.from(out);
    }

    function zipEntry(relativePath: string, bytes: Uint8Array): NgxFileDropEntry {
      const name = relativePath.split('/').pop();
      return new NgxFileDropEntry(relativePath, {
        name, isFile: true, isDirectory: false,
        file: (callback: (file: File) => void) => callback(new File([bytes as BlobPart], name))
      } as any);
    }

    /** Waits for the failure dialog and returns its message. */
    function failure(): Promise<string> {
      return new Promise(resolve => {
        spinner.hide.and.callFake((() => {
          setTimeout(() => resolve((dialog.open.calls.mostRecent().args[1].data as any).message));
          return Promise.resolve();
        }) as any);
      });
    }

    it('reports a .blend file that is not one', async () => {
      const message = failure();
      service.addFiles([entry('model.blend', 'not a blend file')], () => fail('the load failed'));
      expect(await message).toContain('not a .blend file');
    });

    it('opens a zip holding a .blend file with the Blender importer', async () => {
      const message = failure();
      service.addFiles([zipEntry('model.zip', zip([{ name: 'model.blend', data: 'not a blend file' }]))], () => fail('the load failed'));
      expect(await message).toContain('not a .blend file');
    });

    it('opens other zips with the Ogre importer', async () => {
      const message = failure();
      service.addFiles([zipEntry('model.zip', zip([{ name: 'notes.txt', data: 'hello' }]))], () => fail('the load failed'));
      expect(await message).toContain('.scene, .mesh or .mesh.xml');
    });

    it('opens a zip holding an OBJ model with the OBJ importer', (done) => {
      const obj = 'mtllib red.mtl\nv 0 0 0\nv 1 0 0\nv 0 1 0\nusemtl Red\nf 1 2 3\n';
      const files = [zipEntry('model.zip', zip([{ name: 'm/tri.obj', data: obj }, { name: 'm/red.mtl', data: 'newmtl Red\nKd 1 0 0\n' }]))];
      service.addFiles(files, () => {
        const group = service.getScene().children.find(c => c.name === 'model.zip');
        let mesh: THREE.Mesh;
        group.traverse(o => { if ((o as THREE.Mesh).isMesh) { mesh = o as THREE.Mesh; } });
        expect((mesh.material as THREE.MeshStandardMaterial).name).toBe('Red');
        done();
      });
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

  describe('other formats', () => {
    const loaded = (name: string) => service.getScene().children.find(c => c.name === name);
    const count = (o: THREE.Object3D, test: (o: THREE.Object3D) => boolean) => {
      let n = 0;
      o.traverse(c => { if (test(c)) { n++; } });
      return n;
    };
    const isMesh = (o: THREE.Object3D) => (o as THREE.Mesh).isMesh;

    /** Waits for the failure dialog and returns its message. */
    function failure(): Promise<string> {
      return new Promise(resolve => {
        spinner.hide.and.callFake((() => {
          setTimeout(() => resolve((dialog.open.calls.mostRecent().args[1].data as any).message));
          return Promise.resolve();
        }) as any);
      });
    }

    it('loads an OBJ model with the material library beside it', (done) => {
      const obj = 'mtllib red.mtl\nv 0 0 0\nv 1 0 0\nv 0 1 0\nusemtl Red\nf 1 2 3\n';
      service.addFiles([entry('tri.obj', obj), entry('red.mtl', 'newmtl Red\nKd 1 0 0\n')], () => {
        expect(dialog.open).not.toHaveBeenCalled();
        const group = loaded('tri.obj');
        expect(count(group, isMesh)).toBe(1);
        let color: THREE.Color;
        group.traverse(o => { if (isMesh(o)) { color = ((o as THREE.Mesh).material as THREE.MeshStandardMaterial).color; } });
        expect(color.r).toBeCloseTo(1);
        expect(color.g).toBeCloseTo(0);
        done();
      });
    });

    it('loads a PLY file', (done) => {
      const ply = 'ply\nformat ascii 1.0\nelement vertex 3\nproperty float x\nproperty float y\nproperty float z\n' +
        'element face 1\nproperty list uchar int vertex_indices\nend_header\n0 0 0\n1 0 0\n0 1 0\n3 0 1 2\n';
      service.addFiles([entry('tri.ply', ply)], () => {
        expect(count(loaded('tri.ply'), isMesh)).toBe(1);
        done();
      });
    });

    it('loads an SVG drawing', (done) => {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10" fill="#00ff00"/></svg>';
      service.addFiles([entry('square.svg', svg)], () => {
        expect(count(loaded('square.svg'), isMesh)).toBe(1);
        done();
      });
    });

    it('loads a USD layer', (done) => {
      const usda = '#usda 1.0\n(\n    upAxis = "Y"\n)\ndef Mesh "Tri"\n{\n    int[] faceVertexCounts = [3]\n' +
        '    int[] faceVertexIndices = [0, 1, 2]\n    point3f[] points = [(0, 0, 0), (1, 0, 0), (0, 1, 0)]\n}\n';
      service.addFiles([entry('tri.usda', usda)], () => {
        expect(count(loaded('tri.usda'), isMesh)).toBe(1);
        done();
      });
    });

    it('opens only the shallowest of several USD layers', () => {
      spyOn(service, 'addFile');
      service.addFiles([entry('set/set.usda', '#usda 1.0\n'), entry('set/parts/a.usda', '#usda 1.0\n'), entry('set/parts/b.usd', '')], () => {});
      expect((service.addFile as jasmine.Spy).calls.allArgs().map(a => a[0].relativePath)).toEqual(['set/set.usda']);
    });

    it('loads a CityJSON model', (done) => {
      const city = JSON.stringify({
        type: 'CityJSON', version: '2.0', transform: { scale: [1, 1, 1], translate: [0, 0, 0] },
        vertices: [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]],
        CityObjects: { b: { type: 'Building', geometry: [{ type: 'MultiSurface', lod: '1', boundaries: [[[0, 1, 2, 3]]] }] } }
      });
      service.addFiles([entry('block.city.json', city)], () => {
        expect(count(loaded('block.city.json'), isMesh)).toBeGreaterThan(0);
        done();
      });
    });

    it('reports a file that is not IGES', async () => {
      const message = failure();
      service.addFiles([entry('part.igs', 'hello\nworld\n')], () => fail('the load failed'));
      expect(await message).toBeTruthy();
      expect(dialog.open).toHaveBeenCalledTimes(1);
    });

    it('reports a model with nothing to draw', async () => {
      const message = failure();
      service.addFiles([entry('empty.obj', '# nothing\n')], () => fail('the load failed'));
      expect(await message).toBeTruthy();
    });
  });

  describe('toolpaths, point clouds, VRML, X3D and environment maps', () => {
    const loaded = (name: string) => service.getScene().children.find(c => c.name === name);
    const count = (o: THREE.Object3D, test: (o: THREE.Object3D) => boolean) => {
      let n = 0;
      o.traverse(c => { if (test(c)) { n++; } });
      return n;
    };

    it('draws a G-code toolpath', (done) => {
      service.addFiles([entry('part.nc', 'G21\nT1 M6\nG0 X0 Y0 Z5\nG1 Z-1 F100\nG2 X10 Y0 I5 J0\n')], () => {
        const group = loaded('part.nc');
        expect(group.getObjectByName('Tool 1')).toBeTruthy();
        expect(group.getObjectByName('Rapid moves')).toBeTruthy();
        done();
      });
    });

    it('loads point clouds from XYZ and PCD files', (done) => {
      const pcd = 'VERSION .7\nFIELDS x y z\nSIZE 4 4 4\nTYPE F F F\nCOUNT 1 1 1\nWIDTH 2\nHEIGHT 1\nPOINTS 2\nDATA ascii\n0 0 0\n1 1 1\n';
      let left = 2;
      service.addFiles([entry('scan.xyz', '0 0 0\n1 0 0\n0 1 0\n'), entry('cloud.pcd', pcd)], () => {
        if (--left) { return; }
        expect(count(loaded('scan.xyz'), o => (o as THREE.Points).isPoints)).toBe(1);
        expect(count(loaded('cloud.pcd'), o => (o as THREE.Points).isPoints)).toBe(1);
        done();
      });
    });

    it('loads OFF, VRML, X3D and AMF models', (done) => {
      const off = 'OFF\n3 1 0\n0 0 0\n1 0 0\n0 1 0\n3 0 1 2\n';
      const wrl = '#VRML V2.0 utf8\nShape { geometry Box { size 1 1 1 } }\n';
      const x3d = '<X3D><Scene><Shape><Sphere radius="1"/></Shape></Scene></X3D>';
      const amf = '<amf><object id="0"><mesh><vertices>' +
        '<vertex><coordinates><x>0</x><y>0</y><z>0</z></coordinates></vertex>' +
        '<vertex><coordinates><x>1</x><y>0</y><z>0</z></coordinates></vertex>' +
        '<vertex><coordinates><x>0</x><y>1</y><z>0</z></coordinates></vertex>' +
        '</vertices><volume><triangle><v1>0</v1><v2>1</v2><v3>2</v3></triangle></volume></mesh></object></amf>';
      const names = ['tri.off', 'box.wrl', 'ball.x3d', 'part.amf'];
      let left = names.length;
      service.addFiles([entry(names[0], off), entry(names[1], wrl), entry(names[2], x3d), entry(names[3], amf)], () => {
        if (--left) { return; }
        expect(dialog.open).not.toHaveBeenCalled();
        for (const name of names) { expect(count(loaded(name), o => (o as THREE.Mesh).isMesh)).withContext(name).toBe(1); }
        done();
      });
    });

    it('lights the scene with an HDR environment map', (done) => {
      const head = new TextEncoder().encode('#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y 1 +X 2\n');
      const hdr = new Uint8Array([...head, 128, 128, 128, 129, 128, 128, 128, 128]);
      const hdrEntry = new NgxFileDropEntry('sky.hdr', {
        name: 'sky.hdr', isFile: true, isDirectory: false,
        file: (callback: (file: File) => void) => callback(new File([hdr as BlobPart], 'sky.hdr'))
      } as any);
      service.addFiles([hdrEntry], () => {
        expect(service.getScene().environment).toBeTruthy();
        expect(service.getScene().background).toBe(service.getScene().environment);
        done();
      });
    });

    it('reports a file that is not E57', async () => {
      const message = new Promise<string>(resolve => {
        spinner.hide.and.callFake((() => {
          setTimeout(() => resolve((dialog.open.calls.mostRecent().args[1].data as any).message));
          return Promise.resolve();
        }) as any);
      });
      service.addFiles([entry('scan.e57', 'hello')], () => fail('the load failed'));
      expect(await message).toContain('E57');
    });
  });
});
