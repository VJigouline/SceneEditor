import { Matrix4, Object3D } from "three";
import { Material } from "../materials/material";
import { ISceneNode } from "./iscene-node";

/** Basic implementation of the {@link ISceneNode} interface. */
export class SceneNode implements ISceneNode {
    public Selectable: boolean = true;
    public Selected: boolean = false;
    public get Visible(): boolean { return this._object.visible; };
    public set Visible(value : boolean) { this._object.visible = value; }
    public get Transform() : Matrix4 { return this._object.matrix; }
    public set Transform(value : Matrix4) { this._object.matrix = value;}
    public Material : Material;  // TODO: get/set material on objects depending on their type.
    public Parent: ISceneNode;   // TODO: set as a child object on IGroupNode.
    public get ID(): string { return this.GraphicObject.id.toString() }
    public get GraphicObject(): Object3D { return this._object; }

    private _object : Object3D;

    /**
     * Constructor.
     * @param object {@link Object3D} object to display.
     * @param material {@link Material} to assign. Optional.
     * @param parent parent {@link ISceneNode} object. Optional.
     * @param transfrom {@link Matrix4} object transformation matrix. Optional.
     */
    public constructor(object : Object3D, material? : Material, parent? : ISceneNode, transfrom? : Matrix4) {
        this._object = object;
        this.Material = material;
        this.Parent = parent;
        if (transfrom) this.GraphicObject.matrix = transfrom;
    }
}
