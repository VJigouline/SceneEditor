import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridTile } from '@angular/material/grid-list';
import * as THREE from 'three';

export interface CubeMapDialogData {
  imgPosX: HTMLImageElement;
  imgNegX: HTMLImageElement;
  imgPosY: HTMLImageElement;
  imgNegY: HTMLImageElement;
  imgPosZ: HTMLImageElement;
  imgNegZ: HTMLImageElement;
}

@Component({
  selector: 'app-cube-map-dialog',
  templateUrl: './cube-map-dialog.component.html',
  styleUrls: ['./cube-map-dialog.component.scss']
})
export class CubeMapDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('negX', { static: true })
  negX: MatGridTile;
  @ViewChild('posX', { static: true })
  posX: MatGridTile;
  @ViewChild('negY', { static: true })
  negY: MatGridTile;
  @ViewChild('posY', { static: true })
  posY: MatGridTile;
  @ViewChild('negZ', { static: true })
  negZ: MatGridTile;
  @ViewChild('posZ', { static: true })
  posZ: MatGridTile;

  get bkgNegX(): string { return this.data.imgNegX ? 'url(' + this.data.imgNegX.src + ')' : 'lightgray'; }
  get bkgPosX(): string { return this.data.imgPosX ? 'url(' + this.data.imgPosX.src + ')' : 'lightgray'; }
  get bkgNegY(): string { return this.data.imgNegY ? 'url(' + this.data.imgNegY.src + ')' : 'lightgray'; }
  get bkgPosY(): string { return this.data.imgPosY ? 'url(' + this.data.imgPosY.src + ')' : 'lightgray'; }
  get bkgNegZ(): string { return this.data.imgNegZ ? 'url(' + this.data.imgNegZ.src + ')' : 'lightgray'; }
  get bkgPosZ(): string { return this.data.imgPosZ ? 'url(' + this.data.imgPosZ.src + ')' : 'lightgray'; }

  get invalid(): boolean { return !this.data.imgNegX || !this.data.imgPosX ||
    !this.data.imgNegY || !this.data.imgPosY || !this.data.imgNegZ || !this.data.imgPosZ; }

  constructor(
    public dialogRef: MatDialogRef<CubeMapDialogComponent>,
    private detector: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: CubeMapDialogData
  ) { }

  ngAfterViewInit(): void {
    this.negX._setStyle('background', this.bkgNegX);
    this.negX._setStyle('background-size', 'cover');
    this.posX._setStyle('background', this.bkgPosX);
    this.posX._setStyle('background-size', 'cover');
    this.negY._setStyle('background', this.bkgNegY);
    this.negY._setStyle('background-size', 'cover');
    this.posY._setStyle('background', this.bkgPosY);
    this.posY._setStyle('background-size', 'cover');
    this.negZ._setStyle('background', this.bkgNegZ);
    this.negZ._setStyle('background-size', 'cover');
    this.posZ._setStyle('background', this.bkgPosZ);
    this.posZ._setStyle('background-size', 'cover');
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onImageNegX(event: any): void {
    const selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    new THREE.ImageLoader().load(fileUrl,
      image => {
        this.data.imgNegX = image;
        this.negX._setStyle('background', this.bkgNegX);
        this.negX._setStyle('background-size', 'cover');
      }
    );
  }

  onImagePosX(event: any): void {
    const selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    new THREE.ImageLoader().load(fileUrl,
      image => {
        this.data.imgPosX = image;
        this.posX._setStyle('background', this.bkgPosX);
        this.posX._setStyle('background-size', 'cover');
      }
    );
  }

  onImageNegY(event: any): void {
    const selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    new THREE.ImageLoader().load(fileUrl,
      image => {
        this.data.imgNegY = image;
        this.negY._setStyle('background', this.bkgNegY);
        this.negY._setStyle('background-size', 'cover');
      }
    );
  }

  onImagePosY(event: any): void {
    const selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    new THREE.ImageLoader().load(fileUrl,
      image => {
        this.data.imgPosY = image;
        this.posY._setStyle('background', this.bkgPosY);
        this.posY._setStyle('background-size', 'cover');
      }
    );
  }

  onImageNegZ(event: any): void {
    const selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    new THREE.ImageLoader().load(fileUrl,
      image => {
        this.data.imgNegZ = image;
        this.negZ._setStyle('background', this.bkgNegZ);
        this.negZ._setStyle('background-size', 'cover');
      }
    );
  }

  onImagePosZ(event: any): void {
    const selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    new THREE.ImageLoader().load(fileUrl,
      image => {
        this.data.imgPosZ = image;
        this.posZ._setStyle('background', this.bkgPosZ);
        this.posZ._setStyle('background-size', 'cover');
      }
    );
  }

}
