import * as THREE from 'three';

export class PointLightHelper extends THREE.Object3D {

    public positionSphere: THREE.Mesh;
    private material: THREE.MeshPhysicalMaterial;

    public light: THREE.PointLight;
    constructor(light: THREE.PointLight) {
        super();
        this.light = light;
        this.create3DObjects();
    }

    private create3DObjects() {
        const geom = new THREE.SphereGeometry(20, 16, 16);
        this.material = new THREE.MeshPhysicalMaterial({color: this.light.color,
            emissive: this.light.color.clone().multiplyScalar(0.5)});
        this.positionSphere = new THREE.Mesh(geom, this.material);
        this.positionSphere.position.set(this.light.position.x,
            this.light.position.y, this.light.position.z);
        this.positionSphere.parent = this;
        this.children.push(this.positionSphere);
    }

    public update(light: THREE.PointLight): void {
        this.positionSphere.position.set(light.position.x,
            light.position.y, light.position.z);
        this.material.color = light.color;
        this.material.emissive.set(light.color.clone().multiplyScalar(0.5));
    }
}
