import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product';
import { UploadService } from '../../core/services/upload';
import { CategoryService } from '../../core/services/category';
import { SubCategoryService } from '../../core/services/sub-category';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-upload-product',
  standalone: false,
  templateUrl: './upload-product.html',
  styleUrl: './upload-product.scss',
})
export class UploadProductPage implements OnInit {

  productForm!: FormGroup;

  imageLoading = false;
  submitting = false;

  viewImageURL = '';

  openAddField = false;
  fieldName = '';

  searchSubCategory = '';
  filteredSubCategories: SubCategory[] = [];
  showSubCategoryList = false;

  selectCategory = '';
  selectSubCategory = '';

  allCategory: Category[] = [];
  allSubCategory: SubCategory[] = [];

  @ViewChild('subCategoryContainer')
  subCategoryContainer!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private uploadService: UploadService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
    this.loadSubCategories();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {

    if (!this.subCategoryContainer) return;

    const clickedInside =
      this.subCategoryContainer.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.showSubCategoryList = false;
    }

  }


  private initializeForm(): void {

    this.productForm = this.fb.group({

      name: ['', Validators.required],

      description: ['', Validators.required],

      unit: ['', Validators.required],

      stock: [0],

      price: [null, Validators.required],

      discount: [0],

      image: this.fb.array([], Validators.required),

      category: this.fb.array([], Validators.required),

      subCategory: this.fb.array([], Validators.required),

      more_details: this.fb.group({})

    });

  }

  // ----------------------------
  // Form Getters
  // ----------------------------

  get images(): FormArray {
    return this.productForm.get('image') as FormArray;
  }

  get categories(): FormArray {
    return this.productForm.get('category') as FormArray;
  }

  get subCategories(): FormArray {
    return this.productForm.get('subCategory') as FormArray;
  }

  get moreDetails(): FormGroup {
    return this.productForm.get('more_details') as FormGroup;
  }

  // ----------------------------
  // Load Categories
  // ----------------------------

  loadCategories(): void {

    this.categoryService.getCategory().subscribe({

      next: (response: any) => {

        if (response.success) {

          this.allCategory = response.data;

        }

      },

      error: (error) => {

        console.error('Category Error', error);

      }

    });

  }

  // ----------------------------
  // Load Sub Categories
  // ----------------------------

  loadSubCategories(): void {

    this.subCategoryService.getSubCategory().subscribe({

      next: (response: any) => {

        if (response.success) {

          this.allSubCategory = response.data;
          this.filteredSubCategories = [...this.allSubCategory];
        }

      },

      error: (error) => {

        console.error('SubCategory Error', error);

      }

    });

  }

  filterSubCategories(): void {
    const keyword = this.searchSubCategory.toLowerCase();

    this.filteredSubCategories = this.allSubCategory.filter(sub =>
      sub.name.toLowerCase().includes(keyword)
    );

    this.showSubCategoryList = true;
  }
  selectSub(sub: SubCategory): void {

    this.addSubCategory(sub._id);
  
    this.searchSubCategory = '';
  
    this.filteredSubCategories = [...this.allSubCategory];
  
    this.showSubCategoryList = false;
  
  }

  // ----------------------------
  // Upload Image
  // ----------------------------

  uploadImage(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    this.imageLoading = true;

    this.uploadService
      .uploadImage(file)
      .pipe(finalize(() => (this.imageLoading = false)))
      .subscribe({

        next: (response: any) => {

          if (response.success) {

            this.images.push(
              new FormControl(response.data.url)
            );

          }

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  // ----------------------------
  // Delete Image
  // ----------------------------

  deleteImage(index: number): void {

    this.images.removeAt(index);

  }

  // ----------------------------
  // Preview Image
  // ----------------------------

  previewImage(url: string): void {

    this.viewImageURL = url;

  }

  closePreview(): void {

    this.viewImageURL = '';

  }

  // ----------------------------
  // Category
  // ----------------------------

  addCategory(categoryId: string): void {

    if (!categoryId) return;

    if (this.categories.value.includes(categoryId)) {
      this.selectCategory = '';
      return;
    }

    this.categories.push(
      new FormControl(categoryId)
    );

    this.selectCategory = '';

  }

  removeCategory(index: number): void {

    this.categories.removeAt(index);

  }

  getCategoryName(id: string): string {

    const category = this.allCategory.find(
      item => item._id === id
    );

    return category ? category.name : '';

  }

  // ----------------------------
  // Sub Category
  // ----------------------------

  addSubCategory(subCategoryId: string): void {

    if (!subCategoryId) return;

    if (this.subCategories.value.includes(subCategoryId)) {
      this.selectSubCategory = '';
      return;
    }

    this.subCategories.push(
      new FormControl(subCategoryId)
    );

    this.selectSubCategory = '';

  }

  removeSubCategory(index: number): void {

    this.subCategories.removeAt(index);

  }

  getSubCategoryName(id: string): string {

    const subCategory = this.allSubCategory.find(
      item => item._id === id
    );

    return subCategory ? subCategory.name : '';

  }

  // ----------------------------
  // Dynamic Fields
  // ----------------------------

  addField(): void {

    const key = this.fieldName.trim();

    if (!key) {
      return;
    }

    if (this.moreDetails.contains(key)) {
      this.fieldName = '';
      this.openAddField = false;
      return;
    }

    this.moreDetails.addControl(
      key,
      new FormControl('')
    );

    this.fieldName = '';

    this.openAddField = false;

  }

  removeField(field: string): void {

    this.moreDetails.removeControl(field);

  }

  // ----------------------------
  // Submit
  // ----------------------------


  submit(): void {
    console.log('Submit clicked');
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.toastr.warning('Please fill all required fields.');
      return;
    }

    const payload = {
      name: this.productForm.value.name,
      image: this.images.value,
      category: this.categories.value,
      subCategory: this.subCategories.value,
      unit: this.productForm.value.unit,
      stock: Number(this.productForm.value.stock),
      price: Number(this.productForm.value.price),
      discount: Number(this.productForm.value.discount),
      description: this.productForm.value.description,
      more_details: this.moreDetails.value
    };

    this.submitting = true;

    this.productService
      .createProduct(payload)
      .pipe(finalize(() => this.submitting = false))
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.toastr.success(response.message || 'Product added successfully.');
            this.resetForm();
          }
        },
        error: (error) => {
          this.toastr.error(
            error?.error?.message || 'Unable to create product.'
          );
        }
      });
  }

  // ----------------------------
  // Reset Form
  // ----------------------------

  resetForm(): void {

    this.productForm.reset({

      name: '',

      description: '',

      unit: '',

      stock: 0,

      price: 0,

      discount: 0

    });

    this.images.clear();

    this.categories.clear();

    this.subCategories.clear();

    Object.keys(this.moreDetails.controls)
      .forEach(key => {

        this.moreDetails.removeControl(key);

      });

    this.viewImageURL = '';

    this.fieldName = '';

    this.selectCategory = '';

    this.selectSubCategory = '';

    this.openAddField = false;

  }

}
