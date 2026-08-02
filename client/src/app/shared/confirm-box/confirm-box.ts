import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-box',
  standalone: false,
  templateUrl: './confirm-box.html',
  styleUrl: './confirm-box.scss',
})
export class ConfirmBox {

  constructor(
    public dialogRef: MatDialogRef<ConfirmBox>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
