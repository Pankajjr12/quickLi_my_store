import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../core/services/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-category',
  standalone: false,
  templateUrl: './upload-category.html',
  styleUrl: './upload-category.scss',
})
export class UploadCategory {
  loading = false;

  imageUrl = '';

  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private dialogRef: MatDialogRef<UploadCategory>
  ) {

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    });

  }

  uploadImage(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    this.service.uploadImage(file).subscribe((res: any) => {

      this.imageUrl = res.data.url;

      this.categoryForm.patchValue({
        image: res.data.url
      });

    });

  }

  saveCategory() {

    if (this.categoryForm.invalid) {
      return;
    }

    this.loading = true;

    this.service.addCategory(this.categoryForm.value).subscribe({

      next: (res: any) => {

        this.loading = false;

        if (res.success) {
          this.dialogRef.close(true);
        }

      },

      error: () => {
        this.loading = false;
      }

    });

  }

  close() {
    this.dialogRef.close();
  }

}