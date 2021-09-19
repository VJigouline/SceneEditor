import { Matrix4, Object3D } from "three"
import { Material } from "../materials/material";

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
    Parent : ISceneNode;
    /**
     * Automatically generated object ID.
     */
    readonly ID : string;
    /**
     * ThreeJS graphic object.
     */
    readonly GraphicObject : Object3D
}

/**
 * Interface to specify hierarhical object.
 */
export interface IGroupNode extends ISceneNode {
    /**
     * Collection of all {@link ISceneNode} child objects.
     */
    readonly Children : ISceneNode[];

    /**
     * Add {@link ISceneNode} object as child object.
     * @param node {@link ISceneNode} object to add
     */
    Add(node : ISceneNode) : void;
    /**
     * Remove child {@link ISceneNode} object.
     * @param node {@link ISceneNode} object to remove
     */
    Remove(node : ISceneNode) : void;
    /** Remove all child objects. */
    Clear() : void;
}
