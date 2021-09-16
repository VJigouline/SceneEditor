import { ISceneNode } from "./iscene-node"

/**
 * Interface to the scene node manager. All scene nodes stored in the
 * node manager are drawn on the screen unless they are hidden.
 */
export interface INodeManager {
    /** Collection of all scene nodes in the manager. */
    Nodes : ISceneNode[];

    /**
     * Add node to the scene manager.
     * @param node Node to add.
     */
    Add(node : ISceneNode) : void;
    /**
     * Remove node from the scene manager.
     * @param node Node to remove.
     */
    Remove(node : ISceneNode) : void;
    /**
     * Remove all the scene nodes from the manager.
     */
    Clear() : void;
}
