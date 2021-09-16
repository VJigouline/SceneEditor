import { ICameraManager } from "./icamera-manager";
import { ILightSet } from "./ilight-set";
import { IMaterialManager } from "./imaterial-manager";
import { INodeManager } from "./inode-manager";
import { IScene } from "./iscene";
import { ISelectionManager } from "./iselection-manager";
import { IUserInput } from "./iuser-input";

export class Scene implements IScene {
    LightSet: ILightSet;
    NodeManager: INodeManager;
    MaterialManager: IMaterialManager;
    CameraManager: ICameraManager;
    SelectionManager: ISelectionManager;
    UserInput: IUserInput;
    Redraw(): void {
        throw new Error("Method not implemented.");
    }
    Clear(): void {
        throw new Error("Method not implemented.");
    }
}
