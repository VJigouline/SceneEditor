import { AddEquation, Color, Light } from "three";

/** Collection of lights in the scene, which can be set as a single unit. */
export interface ILightSet {
    /** Collection of lights. */
    readonly Lights : Light[];

    /** Display name of the light set.*/
    Name : string;
    /** Ambient light brightness. */
    Ambient : Color;
    /** Ambient light intensity. */
    AmbientIntensity : number;

    /**
     * Add light to the light set.
     * @param light Light to add.
     */
    Add(light : Light) : void;
    /**
     * Remove light from the light set.
     * @param light Light to remove.
     */
    Remove(light : Light) : void;
    /** Remove all lights from the light set */
    Clear() : void;
}
