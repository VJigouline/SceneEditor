/// <reference lib="webworker" />

// Tessellates STEP shape items for ThreeSceneService.addStepFile: reads the file it is sent, then
// tessellates the items it is handed. All the work is in the library.
import { runStepWorker } from 'meercad-step-import';

runStepWorker();
