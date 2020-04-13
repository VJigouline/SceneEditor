import * as THREE from 'three';
import { Sphere } from 'three';

export class DirectionalLightHelper extends THREE.Object3D {

    public positionSphere: THREE.Mesh;
    public targetSphere: THREE.Mesh;
    private material: THREE.MeshPhysicalMaterial;
    private arrow: THREE.ArrowHelper;

    public light: THREE.DirectionalLight;
    constructor(light: THREE.DirectionalLight) {
        super();
        this.light = light;
        this.create3DObjects();
    }

    private create3DObjects() {
        let geom = new THREE.SphereGeometry(10, 16, 16);
        this.material = new THREE.MeshPhysicalMaterial({color: this.light.color,
            emissive: this.light.color.clone().multiplyScalar(0.5)});
        this.positionSphere = new THREE.Mesh(geom, this.material);
        this.positionSphere.position.set(this.light.position.x,
            this.light.position.y, this.light.position.z);
        this.positionSphere.parent = this;
        this.children.push(this.positionSphere);
        geom = new THREE.SphereGeometry(5, 16, 16);
        this.targetSphere = new THREE.Mesh(geom, this.material);
        this.targetSphere.position.set(this.light.target.position.x,
            this.light.target.position.y, this.light.target.position.z);
        this.targetSphere.parent = this;
        this.children.push(this.targetSphere);

        const dir = this.light.target.position.clone().sub(this.light.position);
        const len = dir.length();
        dir.normalize();
        this.arrow = new THREE.ArrowHelper(dir, this.light.position, len, this.light.color.getHex());
        this.children.push(this.arrow);
    }

    public update(light: THREE.DirectionalLight): void {
        this.positionSphere.position.set(light.position.x,
            light.position.y, light.position.z);
        this.targetSphere.position.set(light.target.position.x,
            light.target.position.y, light.target.position.z);
        this.material.color = light.color;
        this.material.emissive.set(light.color.clone().multiplyScalar(0.5));
        const dir = light.target.position.clone().sub(light.position);
        const len = dir.length();
        dir.normalize();
        this.arrow.position.set(light.position.x, light.position.y, light.position.z);
        this.arrow.setDirection(dir);
        this.arrow.setLength(len);
        this.arrow.setColor(light.color.getHex());
    }
}
