import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../core/services/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  standalone: false,
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.scss',
})
export class EditCategory {
  loading = false;
  imageUrl = '';

  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditCategory>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      image: [data.image]
    });

    this.imageUrl = data.image;
  }

  uploadImage(event: any): void {

    const file = event.target.files[0];

    if (!file) return;

    this.loading = true;

    this.categoryService.uploadImage(file).subscribe({

      next: (res: any) => {

        this.loading = false;

        this.imageUrl = res.data.url;

        this.categoryForm.patchValue({
          image: this.imageUrl
        });

      },

      error: () => {

        this.loading = false;
        this.toastr.error('Image upload failed');

      }

    });

  }

  updateCategory(): void {

    if (this.categoryForm.invalid) {
      return;
    }

    const payload = {
      _id: this.data._id,
      name: this.categoryForm.value.name,
      image: this.imageUrl
    };

    this.loading = true;

    this.categoryService.updateCategory(payload).subscribe({

      next: (res: any) => {

        this.loading = false;

        if (res.success) {
          this.toastr.success(res.message);
          this.dialogRef.close(true);
        }

      },

      error: (err) => {

        this.loading = false;
        this.toastr.error(err.error?.message || 'Something went wrong');

      }

    });

  }

}