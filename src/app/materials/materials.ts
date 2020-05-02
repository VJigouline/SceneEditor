import { Material, LineDashedMaterial, LineBasicMaterial,
    MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial,
    MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial,
    MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial,
    PointsMaterial, ShadowMaterial, SpriteMaterial } from './material';
import { MaterialType } from './material-type.enum';

export class Materials {
    public name = 'Materials';
    public materials = new Array<Material>();

    public clone(): Materials {
        const ret = new Materials();
        ret.name = this.name;

        for (const material of this.materials) {
            switch (material.type) {
                case MaterialType.LINE_BASIC:
                    const lbm = new LineBasicMaterial();
                    lbm.copy(material as LineBasicMaterial);
                    ret.materials.push(lbm);
                    break;
                case MaterialType.LINE_DASHED:
                    const ldm = new LineDashedMaterial();
                    ldm.copy(material as LineDashedMaterial);
                    ret.materials.push(ldm);
                    break;
                case MaterialType.MESH_BASIC:
                    const mbm = new MeshBasicMaterial();
                    mbm.copy(material as MeshBasicMaterial);
                    ret.materials.push(mbm);
                    break;
                case MaterialType.MESH_DEPTH:
                    const mdm = new MeshDepthMaterial();
                    mdm.copy(material as MeshDepthMaterial);
                    ret.materials.push(mdm);
                    break;
                case MaterialType.MESH_LAMBERT:
                    const mlm = new MeshLambertMaterial();
                    mlm.copy(material as MeshLambertMaterial);
                    ret.materials.push(mlm);
                    break;
                case MaterialType.MESH_MATCAP:
                    const mmm = new MeshMatcapMaterial();
                    mmm.copy(material as MeshMatcapMaterial);
                    ret.materials.push(mmm);
                    break;
                case MaterialType.MESH_NORMAL:
                    const mnm = new MeshNormalMaterial();
                    mnm.copy(material as MeshNormalMaterial);
                    ret.materials.push(mnm);
                    break;
                case MaterialType.MESH_PHONG:
                    const mphong = new MeshPhongMaterial();
                    mphong.copy(material as MeshPhongMaterial);
                    ret.materials.push(mphong);
                    break;
                case MaterialType.MESH_PHYSICAL:
                    const mpm = new MeshPhysicalMaterial();
                    mpm.copy(material as MeshPhysicalMaterial);
                    ret.materials.push(mpm);
                    break;
                case MaterialType.MESH_STANDARD:
                    const msm = new MeshStandardMaterial();
                    msm.copy(material as MeshStandardMaterial);
                    ret.materials.push(msm);
                    break;
                case MaterialType.MESH_TOON:
                    const mtm = new MeshToonMaterial();
                    mtm.copy(material as MeshToonMaterial);
                    ret.materials.push(mtm);
                    break;
                case MaterialType.POINTS:
                    const pm = new PointsMaterial();
                    pm.copy(material as PointsMaterial);
                    ret.materials.push(pm);
                    break;
                case MaterialType.SHADOW:
                    const sm = new ShadowMaterial();
                    sm.copy(material as ShadowMaterial);
                    ret.materials.push(sm);
                    break;
                case MaterialType.SPRITE:
                    const spm = new SpriteMaterial();
                    spm.copy(material as SpriteMaterial);
                    ret.materials.push(spm);
                    break;
                default:
                    console.error('Unknown material type.');
                    break;
            }
        }

        return ret;
    }
}
