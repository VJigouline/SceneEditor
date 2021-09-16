import { Material } from "three";

/** Interface to manage materials */
export interface IMaterialManager {
    /** Return collection of all materials. */
    readonly Materials : Material[];

    /**
     * Add material to the material manager.
     * @param material 
     */
    Add(material : Material) : void;
    /**
     * Add material to the material manager and associate a name with it. 
     * @param name Name associated with material.
     * @param material Material to add.
     */
    Add(name : string, material : Material) : void;
    /**
     * Remove material from the material manager.
     * @param material Material to remove.
     */
    Remove(material : Material) : void;
    /**
     * Remove material from the material manager by material name.
     * @param name Material name.
     */
    Remove(name : string) : void;
    /** Remove all materials from the material manager.*/
    Clear() : void;
    /**
     * Return material by material name.
     * @param name Material name.
     */
    Get(name : string) : Material;
}
