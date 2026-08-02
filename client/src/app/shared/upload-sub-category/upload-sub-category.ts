import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../core/services/category';
import { SubCategoryService } from '../../core/services/sub-category';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-sub-category',
  standalone: false,
  templateUrl: './upload-sub-category.html',
  styleUrl: './upload-sub-category.scss',
})
export class UploadSubCategory implements OnInit {

  form!: FormGroup;

  loading = false;

  imageUrl = '';

  allCategory: any[] = [];

  selectedCategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<UploadSubCategory>
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      name: ['', Validators.required],

      image: [''],

      category: [[]]

    });

    this.fetchCategory();

  }

  fetchCategory() {

    this.categoryService.getCategory().subscribe({

      next: (res: any) => {

        if (res.success) {

          this.allCategory = res.data;

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

        this.form.patchValue({

          image: this.imageUrl

        });

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

    const category = this.allCategory.find(x => x._id === id);

    if (!category) return;

    const exist = this.selectedCategories.find(x => x._id === id);

    if (exist) return;

    this.selectedCategories.push(category);

    this.form.patchValue({

      category: this.selectedCategories

    });

  }

  removeCategory(id: string) {

    this.selectedCategories = this.selectedCategories.filter(

      x => x._id !== id

    );

    this.form.patchValue({

      category: this.selectedCategories

    });

  }

  submit() {

    if (

      this.form.invalid ||

      !this.imageUrl ||

      !this.selectedCategories.length

    ) {

      return;

    }

    this.loading = true;

    this.subCategoryService.createSubCategory(this.form.value).subscribe({

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

  close() {

    this.dialogRef.close();

  }

}