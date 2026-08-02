import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../core/services/category';
import { SubCategoryService } from '../../core/services/sub-category';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-sub-category',
  standalone: false,
  templateUrl: './edit-sub-category.html',
  styleUrl: './edit-sub-category.scss',
})
export class EditSubCategory {

  loading = false;

  imageUrl = '';

  categories: any[] = [];

  selectedCategories: any[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<EditSubCategory>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.imageUrl = data.image;

    this.selectedCategories = [...data.category];

    this.form = this.fb.group({
      name: [data.name, Validators.required]
    });

    this.getCategories();
  }

  getCategories() {

    this.categoryService.getCategory().subscribe({

      next: (res: any) => {

        if (res.success) {
          this.categories = res.data;
        }

      }

    });

  }

  uploadImage(event: any) {

    const file = event.target.files[0];

    if (!file) return;

    this.loading = true;

    this.categoryService.uploadImage(file).subscribe({

      next: (res: any) => {

        this.loading = false;

        this.imageUrl = res.data.url;

      },

      error: () => {

        this.loading = false;

        this.toastr.error('Image upload failed');

      }

    });

  }

  addCategory(event: any) {

    const id = event.target.value;

    if (!id) return;

    const category = this.categories.find(x => x._id === id);

    const exists = this.selectedCategories.find(x => x._id === id);

    if (!exists) {
      this.selectedCategories.push(category);
    }

    event.target.value = "";
  }

  removeCategory(id: string) {

    this.selectedCategories =
      this.selectedCategories.filter(x => x._id !== id);

  }

  updateSubCategory() {

    if (this.form.invalid) return;

    const payload = {

      _id: this.data._id,

      name: this.form.value.name,

      image: this.imageUrl,

      category: this.selectedCategories

    };

    this.loading = true;

    this.subCategoryService.updateSubCategory(payload).subscribe({

      next: (res: any) => {

        this.loading = false;

        if (res.success) {

          this.toastr.success(res.message);

          this.dialogRef.close(true);

        }

      },

      error: (err) => {

        this.loading = false;

        this.toastr.error(
          err.error?.message || 'Something went wrong'
        );

      }

    });

  }

}
