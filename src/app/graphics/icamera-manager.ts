import { Camera, Vector3 } from "three";

/** Interface to manage camera. */
export interface ICameraManager {
    /** ThreeJS camera */
    Camera : Camera;
    /**
     * Zoom camera so scene will fill the screen. 
     * @param dir Camera direction.
     * @param up  Camera up vector.
     */
    ZoomCameraToExtents(dir : Vector3, up : Vector3) : void;
}
