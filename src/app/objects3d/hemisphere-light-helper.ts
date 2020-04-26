import * as THREE from 'three';

export class HemisphereLightHelper extends THREE.Object3D {

    public positionSphere: THREE.Mesh;
    public helperScale = 1.0;
    private material: THREE.MeshPhysicalMaterial;
    private camera: THREE.Camera;

    public light: THREE.HemisphereLight;
    constructor(light: THREE.HemisphereLight, scale: number, camera: THREE.Camera) {
        super();
        this.helperScale = scale;
        this.light = light;
        this.camera = camera;
        this.create3DObjects();
    }

    private create3DObjects() {
        const geom = new THREE.SphereGeometry(this.helperScale * 20, 16, 16);
        this.material = new THREE.MeshPhysicalMaterial({color: this.light.color,
            emissive: this.light.color.clone().multiplyScalar(0.5)});
        this.positionSphere = new THREE.Mesh(geom, this.material);
        this.positionSphere.position.set(this.light.position.x,
            this.light.position.y, this.light.position.z);
        this.positionSphere.parent = this;
        this.children.push(this.positionSphere);
        this.updateMatrixWorld();
    }

    public update(light: THREE.HemisphereLight): void {
        this.positionSphere.position.set(light.position.x,
            light.position.y, light.position.z);
        this.material.color = light.color;
        this.material.emissive.set(light.color.clone().multiplyScalar(0.5));
        this.updateMatrixWorld();
    }

    public updateMatrixWorld(): void {
        super.updateMatrixWorld();

        let factor: number;
        if ( (this.camera as THREE.OrthographicCamera).isOrthographicCamera ) {
            const orthoCam = this.camera as THREE.OrthographicCamera;
            factor = ( orthoCam.top - orthoCam.bottom ) / orthoCam.zoom;
        } else {
            const perspectiveCam = this.camera as THREE.PerspectiveCamera;
            factor = this.position.distanceTo(
                perspectiveCam.position ) * Math.min(
                1.9 * Math.tan( Math.PI * perspectiveCam.fov / 360 ) / perspectiveCam.zoom, 7 );
        }

        this.positionSphere.scale.set( 1, 1, 1 ).multiplyScalar( factor * this.helperScale / 1000 );
    }
}
