import { ICameraManager } from "./icamera-manager";
import { ILightSet } from "./ilight-set";
import { IMaterialManager } from "./imaterial-manager";
import { INodeManager } from "./inode-manager";
import { ISelectionManager } from "./iselection-manager";
import { IUserInput } from "./iuser-input";

/** Interface to the graphical scene. */
export interface IScene {
    /** Current light set. */
    LightSet : ILightSet;
    /** Scene node manager. */
    readonly NodeManager : INodeManager;
    /** Scene material manager. */
    readonly MaterialManager : IMaterialManager;
    /** Scene camera manager. */
    readonly CameraManager : ICameraManager;
    /** Scene selection manager. */
    readonly SelectionManager : ISelectionManager;
    /** Scene user input manager. */
    readonly UserInput : IUserInput;

    /** Update all changed objects and redraw screen. */
    Redraw() : void;
    /** Clear geometry/nodes/materials/textures. */
    Clear() : void;
}
