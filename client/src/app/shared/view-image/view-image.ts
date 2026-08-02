import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-image',
  standalone: false,
  templateUrl: './view-image.html',
  styleUrl: './view-image.scss',
})
export class ViewImage {
  constructor(
    @Inject(MAT_DIALOG_DATA) public image: string,
    private dialogRef: MatDialogRef<ViewImage>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
