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

This project is not finished. Drop GLTF/GLB (file or folder), Collada (file or folder), STL or `.polygons` files into graphics area on the left, or choose files with **Open files** on the **Scene** tab, and try using controls. Scenes saved as GLTF can be loaded the same way, but scenes saved in the three.js `scene.json` format can't be loaded back into **SceneEditor**.

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
