import { Material } from "three";
import { IEvent } from "./ievent";
import { ISceneNode } from "./iscene-node";

/** Interface to selection manager for scene node selection using mouse. */
export interface ISelectionManager {
    /** Collection of the currently selected nodes. */
    readonly Selected : ISceneNode[];
    /** Material to highlight shaded nodes which are candidates for the selection. */
    ShadedHighlight : Material;
    /** Material to highlight selected shaded nodes. */
    ShadedSelection : Material;
    /** Material to highlight wireframe nodes which are candidates for the selection. */
    WireframeHighlight : Material;
    /** Material to highlight selected wireframe nodes. */
    WireframeSelection : Material;

    /**
     * Select scene node.
     * @param node {@link ISceneNode} to select.
     */
    SelectNode(node : ISceneNode) : void;
    /**
     * Select collection of scene nodes.
     * @param nodes Collection of {@link ISceneNode} to select.
     */
    SelectNodes(nodes : ISceneNode[]) : void;
    /**
     * Deselect scene node.
     * @param node {@link ISceneNode} to deselect.
     */
     DeselectNode(node : ISceneNode) : void;
     /**
      * Deselect collection of scene nodes.
      * @param nodes Collection of {@link ISceneNode} to deselect.
      */
     DeselectNodes(nodes : ISceneNode[]) : void;

     /** Event raised, when selection is changed. */
     readonly SelectionChanged : IEvent<ISelectionManager, ISelectionEventArgs>;
 }

 /** Interface to specify values sent when selection event is raised. */
 export interface ISelectionEventArgs {
    /** Collection of the elements, which were added to the selection. */
    readonly Added : ISceneNode[];
    /** Collection of the elements, which were removed from the selection. */
    readonly Removed : ISceneNode[];
 }
