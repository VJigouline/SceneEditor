/** A file read from the internet, with its path relative to the model it belongs to. */
export interface UrlFile {
  path: string;
  data: Blob;
}

/** The model read from a URL, the files it references, and what could not be read. */
export interface UrlModel {
  files: UrlFile[];
  warnings: string[];
}

type Fetch = (url: string) => Promise<Response>;

// File extensions for servers that name a file only by its content type.
const contentTypes: Record<string, string> = {
  'model/gltf-binary': 'glb',
  'model/gltf+json': 'gltf',
  'model/stl': 'stl',
  'model/obj': 'obj',
  'model/3mf': '3mf',
  'model/vnd.usdz+zip': 'usdz',
  'model/vrml': 'wrl',
  'model/x3d+xml': 'x3d',
  'model/step': 'step',
  'model/iges': 'iges',
  'application/zip': 'zip',
  'image/vnd.dxf': 'dxf'
};

/**
 * Turns a link to a page showing a file into a link to the file itself, for the hosts where that
 * is known: a GitHub file page becomes its raw file.
 */
export function directUrl(url: string): string {
  const u = new URL(url.trim());
  const github = /^\/([^/]+)\/([^/]+)\/(?:blob|raw)\/(.+)$/.exec(u.pathname);
  if (u.hostname === 'github.com' && github) {
    return `https://raw.githubusercontent.com/${github[1]}/${github[2]}/${github[3]}`;
  }
  return u.href;
}

/** The file name a URL gives, from its path, the server's file name, or its content type. */
function fileName(url: string, response: Response): string {
  const disposition = response.headers.get('content-disposition') ?? '';
  const given = /filename\*=(?:UTF-8'')?([^;]+)|filename="?([^";]+)"?/i.exec(disposition);
  if (given) { return decodeURIComponent((given[1] ?? given[2]).trim()).split(/[\\/]/).pop(); }
  let name = decodeURIComponent(new URL(response.url || url).pathname.split('/').pop() ?? '');
  if (!/\.[a-z0-9]+$/i.test(name)) {
    const type = (response.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
    if (contentTypes[type]) { name = `${name || 'model'}.${contentTypes[type]}`; }
  }
  return name || 'model';
}

/** Whether a reference in a model is to a file beside it, rather than embedded or elsewhere. */
const isRelative = (uri: string) => !!uri && !/^(data:|blob:|[a-z][a-z0-9+.-]*:|\/\/)/i.test(uri);

/** A reference's path from the model, as the importers look it up. */
const join = (folder: string, uri: string) => (folder + uri).replace(/^(\.\/)+/, '').replace(/\/(\.\/)+/g, '/');

/**
 * Reads a model from the internet, with the buffers and textures a glTF file references and the
 * materials and textures of an OBJ file, which live beside it.
 */
export async function fetchModel(url: string, fetcher: Fetch = u => fetch(u)): Promise<UrlModel> {
  const address = directUrl(url);
  const response = await fetcher(address);
  if (!response.ok) { throw new Error(`${address} answered ${response.status} ${response.statusText}`.trim()); }
  const main: UrlFile = { path: fileName(address, response), data: await response.blob() };
  const base = response.url || address;
  const files = [main];
  const warnings: string[] = [];
  const seen = new Set<string>([main.path]);

  const add = async (path: string, uri: string): Promise<UrlFile | undefined> => {
    if (seen.has(path)) { return undefined; }
    seen.add(path);
    const resource = new URL(path, base).href;
    try {
      const r = await fetcher(resource);
      if (!r.ok) { throw new Error(`${r.status} ${r.statusText}`.trim()); }
      const file = { path, data: await r.blob() };
      files.push(file);
      return file;
    } catch (error) {
      warnings.push(`${uri} could not be read from ${resource}: ${error instanceof Error ? error.message : String(error)}`);
      return undefined;
    }
  };

  const extension = main.path.split('.').pop().toLowerCase();
  if (extension === 'gltf') {
    const json = JSON.parse(await main.data.text()) as { buffers?: { uri?: string }[]; images?: { uri?: string }[] };
    const uris = [...(json.buffers ?? []), ...(json.images ?? [])].map(item => item.uri).filter(isRelative);
    await Promise.all(uris.map(uri => add(join('', uri), uri)));
  } else if (extension === 'obj') {
    const text = await main.data.text();
    const libraries = [...text.matchAll(/^[ \t]*mtllib[ \t]+(.+?)[ \t]*$/gm)].map(m => m[1]);
    await Promise.all(libraries.filter(isRelative).map(async uri => {
      const mtl = await add(join('', uri), uri);
      if (!mtl) { return; }
      const folder = mtl.path.includes('/') ? mtl.path.slice(0, mtl.path.lastIndexOf('/') + 1) : '';
      const maps = [...(await mtl.data.text()).matchAll(/^[ \t]*(?:map_\w+|bump|disp|decal|refl|norm)[ \t]+(.+?)[ \t]*$/gim)]
        // Options such as -bm 1 come before the file name, which is last.
        .map(m => m[1].split(/[ \t]+/).pop());
      await Promise.all(maps.filter(isRelative).map(map => add(join(folder, map), map)));
    }));
  }
  return { files, warnings };
}
