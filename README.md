# SceneEditor

*ThreeJS scene editor.*  
ThreeJS has a [Scene Editor](https://threejs.org/editor/), but this editor is JavaScript based and difficult to extend. This project is to create Angular based alternative.

[Edit on StackBlitz ⚡️](https://stackblitz.com/github/VJigouline/SceneEditor)  
[Angular documentation](https://angular.io/docs)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.  
Project options: routing and [SCSS](https://sass-lang.com/documentation) as a style sheet.

## Version 1.0 released

Stable version 1.0 released. It covers significant part of editing for ThreeJS lights and materials. Viewing GLTF, Collada and STL files. Editing lights and materials for imported files. Retrieving materials from the loaded GLTF and Collada files. Saving and loading lights and materials to reuse in other projects. Exporting scene in GLTF format.

## Version 2.0

Version 2.0 moves the project from Angular 12 to Angular 22, TypeScript 6.0 and three.js r187.

Requirements: Node.js `^22.22.3 || ^24.15.0 || >=26.0.0` and npm 12. Install with `npm ci`, build with `npm run build`, run with `npm start`.

TypeScript stays on 6.0 because the Angular 22 compiler requires `>=6.0 <6.1`.

## Release builds
Release build can be found on master branch in the builds\Releases folder.
### Installation
Unzip release build archive into folder on the web server and call index.html file. Due to security limitations of the web browsers the build can be run only from the web server. Running build from the local computer will cause script loading failures.

## Further development
Implementation of constructive geometry creation and editing.

## Usage
See the [user guide](https://github.com/VJigouline/SceneEditor/wiki) in the wiki.

Working version at [scene.meercad.com](http://scene.meercad.com). This site runs an older build than Version 2.0.

This project is not finished. Drop GLTF/GLB (file or folder), Collada (file or folder), STL, IFC, STEP, DXF, Blender, Ogre (files, folder or zip) or `.polygons` files into graphics area on the left, or choose files with **Open files** on the **Scene** tab, and try using controls. Scenes saved as GLTF can be loaded the same way, but scenes saved in the three.js `scene.json` format can't be loaded back into **SceneEditor**.

### IFC models

IFC files (`.ifc`) are read by [mc-ifc-import](https://github.com/VJigouline/mc-ifc-import): IFC2X3 and every schema of the IFC4 line (IFC2X4, IFC4 with its addenda, IFC4X1, IFC4X2 and IFC4X3), with the schema version detected from the file. Elements come with their colours, in their spatial structure, with their properties in `userData.ifc`.

### STEP models

STEP files (`.stp`, `.step`, `.p21`, and gzip-compressed `.stpz`) are read by [mc-step-import](https://github.com/VJigouline/mc-step-import). It reads AP203, AP214 and AP242, with the application protocol detected from the file.

- **Solids:** B-rep solids with planar, analytic and NURBS faces are tessellated into watertight meshes.
- **Structure:** parts come in their assembly structure, in metres, with the file's colours.
- **Data:** product data is in `userData.step`.

### DXF drawings

DXF drawings (`.dxf`), ASCII or binary, from R12 to the latest AutoCAD versions, are read by [mc-dxf-import](https://github.com/VJigouline/mc-dxf-import).

- **Contents:** lines, arcs, polylines, splines, 3D faces, meshes, solid fills and hatches, in their layers and AutoCAD colours, with blocks expanded where they are inserted. A flat drawing faces the front view; a 3D drawing is turned Y up.
- **Not drawn:** text, pattern hatches and ACIS solids.
- **Details:** see [Using it in SceneEditor](https://github.com/VJigouline/mc-dxf-import/blob/main/Documentation/SceneEditor.md).

### Blender models

Blender files (`.blend`) are read by [mc-blender-import](https://github.com/VJigouline/mc-blender-import), from Blender 2.5 to 5.x, compressed or not, without Blender itself. Images packed into the file need nothing else; for other images, drop the .blend file together with them, its folder, or a zip.

- **Contents:** the current scene's objects with their parenting and collection instances, lights and cameras. Principled BSDF and other node materials become standard materials, with their textures, that can be edited on the **Materials** tab.
- **Not read:** modifiers, armatures and animation, curves and text.
- **Details:** see [Using it in SceneEditor](https://github.com/VJigouline/mc-blender-import/blob/main/Documentation/SceneEditor.md).

### Ogre models

Ogre 3D resources are read by [mc-ogre-import](https://github.com/VJigouline/mc-ogre-import): dotScene `.scene` files, binary `.mesh` and XML `.mesh.xml` meshes, `.material` scripts and their textures. An Ogre model is several files, so drop its folder, drop or open its files together, or drop or open a zip of them.

- **Contents:** scenes come with their node structure, lights and cameras. Materials become standard materials that can be edited on the **Materials** tab.
- **Not read:** skeletons and animations; meshes are shown in their bind pose.
- **Details:** see [Using it in SceneEditor](https://github.com/VJigouline/mc-ogre-import/blob/main/Documentation/SceneEditor.md).

### Photorealistic tab

The **Photorealistic** tab ray traces the scene, with shadows and reflections, progressively and in Web Workers, using [mc-raytracer](https://github.com/VJigouline/mc-raytracer). The ray traced image can replace the main 3D view or appear in a separate browser window that follows the main view's camera. Press **Z** to switch between the three.js view and the ray traced view, as in Blender. The tab sets samples, bounces, resolution, preview, worker threads, shadows, global illumination, tone mapping, exposure, colour space and background, and saves the image as a PNG. See [Ray tracing](https://github.com/VJigouline/SceneEditor/wiki/Ray-Tracing) in the wiki.

![Scene](Images/Scene2.png)
_The image is made from the GLTF model loaded into **SceneEditor**. The model can be found on [NASA Ingenuity page](https://mars.nasa.gov/resources/25043/mars-ingenuity-helicopter-3d-model/?site=insight). After loading model will look dark due to darker materials. Lights intensity should be increased in the **Light Editor**_

## Additional modules

These modules should be added on top of the standard angular installation (`npm install` should do it for you)

### Dependencies

`npm install angular-split` [Documentation](https://bertrandg.github.io/angular-split/#/documentation)  
`npm install three` [Documentation](https://threejs.org/docs/#manual/en/introduction/Import-via-modules)  
`ng add @angular/material` [Documentation](https://material.angular.io/guide/getting-started).  
`npm install file-saver` [Documentation](https://www.npmjs.com/package/file-saver)  
`npm install ngx-color-picker` [Documentation](https://www.npmjs.com/package/ngx-color-picker)  
`npm install angular-in-memory-web-api` [Documentation](https://angular.io/tutorial/toh-pt6) - web server simulation for the testing  
`npm install uuid` [Documentation](https://www.npmjs.com/package/uuid)  
`npm install ngx-file-drop` [Documentation](https://www.npmjs.com/package/ngx-file-drop)  
`npm install --save-dev @types/three` [Documentation](https://github.com/DefinitelyTyped/DefinitelyTyped)  
`npm install ngx-spinner --save` [Documentation](https://www.npmjs.com/package/ngx-spinner) - loading spinner.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. The build is a production build by default.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io). This currently stops with compile errors, because several older spec files call constructors with the wrong arguments.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
