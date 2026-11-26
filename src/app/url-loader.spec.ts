import { directUrl, fetchModel } from './url-loader';

// A fake server: the files it holds, by URL, and the URLs asked for.
function server(files: Record<string, string | { body: string; headers?: Record<string, string> }>) {
  const asked: string[] = [];
  const fetcher = async (url: string) => {
    asked.push(url);
    const file = files[url];
    if (file === undefined) { return new Response('missing', { status: 404, statusText: 'Not Found' }); }
    const { body, headers } = typeof file === 'string' ? { body: file, headers: {} } : file;
    return new Response(body, { status: 200, headers });
  };
  return { fetcher, asked };
}

describe('fetchModel', () => {
  it('turns GitHub file pages into raw files', () => {
    expect(directUrl('https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Box/glTF/Box.gltf'))
      .toBe('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Box/glTF/Box.gltf');
    expect(directUrl(' https://example.com/a.glb ')).toBe('https://example.com/a.glb');
  });

  it('names the file from its path, leaving the query out', async () => {
    const { fetcher } = server({ 'https://example.com/models/My%20Part.stl?v=2': 'solid' });
    const model = await fetchModel('https://example.com/models/My%20Part.stl?v=2', fetcher);
    expect(model.files.map(f => f.path)).toEqual(['My Part.stl']);
  });

  it('names the file from the server when the path does not', async () => {
    const { fetcher } = server({
      'https://example.com/download?id=1': { body: 'x', headers: { 'content-disposition': 'attachment; filename="part.step"' } },
      'https://example.com/get/2': { body: 'x', headers: { 'content-type': 'model/gltf-binary' } }
    });
    expect((await fetchModel('https://example.com/download?id=1', fetcher)).files[0].path).toBe('part.step');
    expect((await fetchModel('https://example.com/get/2', fetcher)).files[0].path).toBe('2.glb');
  });

  it('recognises CityJSON named plain .json, but leaves other JSON alone', async () => {
    const { fetcher } = server({
      'https://example.com/delft.json': '{"type": "CityJSON", "version": "2.0", "CityObjects": {}}',
      'https://example.com/scene.json': '{"metadata": {"type": "Object"}, "object": {}}'
    });
    expect((await fetchModel('https://example.com/delft.json', fetcher)).files[0].path).toBe('delft.city.json');
    expect((await fetchModel('https://example.com/scene.json', fetcher)).files[0].path).toBe('scene.json');
  });

  it('reads the buffers and images a glTF file references, but not embedded ones', async () => {
    const gltf = JSON.stringify({
      buffers: [{ uri: 'Box.bin' }, { uri: 'data:application/octet-stream;base64,AA==' }],
      images: [{ uri: './textures/wood.png' }, { uri: 'https://elsewhere.com/sky.png' }, { bufferView: 0 }]
    });
    const { fetcher, asked } = server({
      'https://example.com/m/Box.gltf': gltf,
      'https://example.com/m/Box.bin': 'bin',
      'https://example.com/m/textures/wood.png': 'png'
    });
    const model = await fetchModel('https://example.com/m/Box.gltf', fetcher);
    expect(model.files.map(f => f.path).sort()).toEqual(['Box.bin', 'Box.gltf', 'textures/wood.png']);
    expect(model.warnings).toEqual([]);
    expect(asked.length).toBe(3);
  });

  it('reads the materials and textures of an OBJ file, and reports those missing', async () => {
    const { fetcher } = server({
      'https://example.com/obj/chair.obj': 'mtllib mats/chair.mtl\nv 0 0 0\n',
      'https://example.com/obj/mats/chair.mtl': 'newmtl a\nmap_Kd wood.jpg\nmap_Bump -bm 0.5 bump.png\nnewmtl b\nmap_Kd wood.jpg\n',
      'https://example.com/obj/mats/wood.jpg': 'jpg'
    });
    const model = await fetchModel('https://example.com/obj/chair.obj', fetcher);
    expect(model.files.map(f => f.path).sort()).toEqual(['chair.obj', 'mats/chair.mtl', 'mats/wood.jpg']);
    expect(model.warnings.length).toBe(1);
    expect(model.warnings[0]).toContain('bump.png');
  });

  it('fails when the model itself is missing', async () => {
    const { fetcher } = server({});
    await expectAsync(fetchModel('https://example.com/none.glb', fetcher)).toBeRejectedWithError(/404 Not Found/);
  });
});
