// Reworked frome the threejs DragControl.

import { ThrowStmt } from '@angular/compiler';
import * as THREE from 'three';

export class HoverControl extends THREE.EventDispatcher {
    private plane = new THREE.Plane();
    private raycaster = new THREE.Raycaster();
    
    private pointer = new THREE.Vector2();
    private worldPosition = new THREE.Vector3();
    private selected = null;
    private hovered = null;
    private intersections = [];
    private domElement : HTMLElement;
    private objects : THREE.Object3D[] = [];
    private camera : THREE.Camera;

    public enabled = true;
    public lastMouseEvent : MouseEvent;
    public transformGroup = false;

	constructor( objects : THREE.Object3D[], camera : THREE.Camera, domElement : HTMLElement ) {

		super();

        this.domElement = domElement;
        this.camera = camera;
        this.objects = objects;

        this.activate();

	}

    public activate() : void {

        this.domElement.addEventListener( 'mousemove', this.onMouseMove.bind(this) );
        this.domElement.addEventListener( 'mousedown', this.onMouseDown.bind(this) );
        this.domElement.addEventListener( 'mouseup', this.onMouseCancel.bind(this) );
        this.domElement.addEventListener( 'mouseleave', this.onMouseCancel.bind(this) );

    }

    public deactivate() : void {

        this.domElement.removeEventListener( 'mousemove', this.onMouseMove.bind(this) );
        this.domElement.removeEventListener( 'mousedown', this.onMouseDown.bind(this) );
        this.domElement.removeEventListener( 'mouseup', this.onMouseCancel.bind(this) );
        this.domElement.removeEventListener( 'mouseleave', this.onMouseCancel.bind(this) );

        this.domElement.style.cursor = '';

    }

    public dispose() : void {

        this.deactivate();

    }

    public getObjects() : THREE.Object3D[] {

        return this.objects;

    }

    private onMouseMove( event : MouseEvent ) : void {

        if ( this.enabled === false ) return;
        
        this.lastMouseEvent = event;
        this.updatePointer( event );

        this.raycaster.setFromCamera( this.pointer, this.camera );

        // hover support

        this.intersections.length = 0;

        this.raycaster.setFromCamera( this.pointer, this.camera );
        this.raycaster.intersectObjects( this.objects, true, this.intersections );

        if ( this.intersections.length > 0 ) {

            const object = this.intersections[ 0 ].object;

            this.plane.setFromNormalAndCoplanarPoint( this.camera.getWorldDirection( this.plane.normal ), this.worldPosition.setFromMatrixPosition( object.matrixWorld ) );

            if ( this.hovered !== object && this.hovered !== null ) {

                this.dispatchEvent( { type: 'hoveroff', object: this.hovered } );

                this.domElement.style.cursor = 'auto';
                this.hovered = null;

            }

            if ( this.hovered !== object ) {

                this.dispatchEvent( { type: 'hoveron', object: object } );

                this.domElement.style.cursor = 'pointer';
                this.hovered = object;

            }

        } else {

            if ( this.hovered !== null ) {

                this.dispatchEvent( { type: 'hoveroff', object: this.hovered } );

                this.domElement.style.cursor = 'auto';
                this.hovered = null;

            }

        }
    }

    private onMouseDown( event : MouseEvent ) : void {

        if ( this.enabled === false ) return;

        this.lastMouseEvent = event;
        this.updatePointer( event );

        this.intersections.length = 0;

        this.raycaster.setFromCamera( this.pointer, this.camera );
        this.raycaster.intersectObjects( this.objects, true, this.intersections );

        if ( this.intersections.length > 0 ) {

            this.selected = ( this.transformGroup === true ) ? this.objects[ 0 ] : this.intersections[ 0 ].object;
            this.dispatchEvent( { type: 'mousedown', object: this.selected } );

        }


    }

    private onMouseCancel() : void {

        if ( this.enabled === false ) return;

        if ( this.selected ) {

            this.dispatchEvent( { type: 'mousecancel', object: this.selected } );

            this.selected = null;

        }

        this.domElement.style.cursor = this.hovered ? 'pointer' : 'auto';

    }

    private updatePointer( event : MouseEvent ) : void {

        const rect = this.domElement.getBoundingClientRect();

        this.pointer.x = ( event.clientX - rect.left ) / rect.width * 2 - 1;
        this.pointer.y = - ( event.clientY - rect.top ) / rect.height * 2 + 1;

    }
}
