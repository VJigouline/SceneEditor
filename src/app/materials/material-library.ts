import { Materials } from './materials';

export class MaterialLibrary {
  public name = 'Default';
  public materials = new Array<Materials>();
  public current = 0;

  public clone(): MaterialLibrary {
      const ret = new MaterialLibrary();
      const materials = new Materials();

      ret.name = this.name;
      ret.current = this.current;

      for (const mat of this.materials) {
          if (!mat.clone) {
            mat.clone = materials.clone.bind(mat);
          }
          ret.materials.push(mat.clone());
      }

      return ret;
  }

  public clear(): void {
      this.materials = [new Materials()];
      this.current = 0;
  }
}
