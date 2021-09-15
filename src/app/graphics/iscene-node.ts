import { Material, Matrix4, Object3D } from "three"

/**
 * Interface to describe single graphic object in _SceneEditor_
 */
export interface ISceneNode {
    /** 
     * Flag. If **true** - the object can be selected, **false** - cannot be selected.
    */
    Selectable : boolean;
    /**
     * Flag. If **true** - object selected, **false** - object not selected.
     */
    Selected : boolean;
    /**
     * Flag. If **true** - object visible, **false** - object not visible.
     */
    Visible : boolean;
    /**
     * Transformation to specify object location/orientation.
     */
    Transform : Matrix4;
    /**
     * Material for rendering.
     */
    Material : Material;
    /**
     * Reference to the parent object. If no parent object, then **null**
     */
    ParentNode : ISceneNode;
    /**
     * Flag. If **true**, then object will be updated during next redraw.
     * This flag is set automatically, during object property update. It can be set manually
     * for the low level control of the update.
     */
    IsDirty : boolean;
    /**
     * Automatically generated object ID.
     */
    readonly ID : string;
    /**
     * ThreeJS graphic object.
     */
    readonly GraphicObject : Object3D
}
