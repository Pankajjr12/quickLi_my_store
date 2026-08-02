import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';


import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../core/services/category';
import { ProductService } from '../../core/services/product';
import { SubCategoryService } from '../../core/services/sub-category';


export interface Category {
  _id: string;
  name: string;
}

export interface SubCategory {
  _id: string;
  name: string;
}

export interface Product {

  _id: string;

  name: string;

  image: string[];

  category: Category[];

  subCategory: SubCategory[];

  unit: string;

  stock: number;

  price: number;

  discount: number;

  description: string;

  more_details: {
    [key: string]: string;
  };
}
@Component({
  selector: 'app-edit-product-admin',
  standalone: false,
  templateUrl: './edit-product-admin.html',
  styleUrl: './edit-product-admin.scss',
})

export class EditProductAdmin implements OnInit {

  @Input() product!: Product;

  @Output() close = new EventEmitter<void>();

  @Output() refresh = new EventEmitter<void>();

  productForm!: FormGroup;

  imageLoading: boolean = false;

  submitting: boolean = false;

  viewImageUrl: string = '';

  selectedCategory: string = '';

  selectedSubCategory: string = '';

  categories: Category[] = [];

  subCategories: SubCategory[] = [];

  openAddField: boolean = false;

  fieldName: string = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private subCategoryService: SubCategoryService
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.loadCategories();

    this.loadSubCategories();

  }



  private initializeForm(): void {

    this.productForm = this.fb.group({

      _id: [
        this.product?._id || ''
      ],

      name: [
        this.product?.name || '',
        Validators.required
      ],

      description: [
        this.product?.description || '',
        Validators.required
      ],

      unit: [
        this.product?.unit || '',
        Validators.required
      ],

      stock: [
        this.product?.stock || 0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      price: [
        this.product?.price || 0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      discount: [
        this.product?.discount || 0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      image: this.fb.array([]),

      category: this.fb.array([]),

      subCategory: this.fb.array([]),

      more_details: this.fb.group({})

    });

    // Images
    if (this.product?.image?.length) {

      this.product.image.forEach(image => {

        this.images.push(
          this.fb.control(image)
        );

      });

    }

    // Categories
    if (this.product?.category?.length) {

      this.product.category.forEach(category => {

        this.categoriesArray.push(
          this.fb.control(category)
        );

      });

    }

    // Sub Categories
    if (this.product?.subCategory?.length) {

      this.product.subCategory.forEach(subCategory => {

        this.subCategoriesArray.push(
          this.fb.control(subCategory)
        );

      });

    }

    // Dynamic Fields
    if (this.product?.more_details) {

      Object.keys(this.product.more_details).forEach(key => {

        this.moreDetails.addControl(

          key,

          this.fb.control(

            this.product.more_details[key],

            Validators.required

          )

        );

      });

    }
  }


  get images(): FormArray {

    return this.productForm.get('image') as FormArray;

  }


  get categoriesArray(): FormArray {

    return this.productForm.get('category') as FormArray;

  }


  get subCategoriesArray(): FormArray {

    return this.productForm.get('subCategory') as FormArray;

  }


  get moreDetails(): FormGroup {

    return this.productForm.get('more_details') as FormGroup;

  }


  get detailKeys(): string[] {

    return Object.keys(this.moreDetails.controls);

  }

  /**
  * Load Categories
  */
  private loadCategories(): void {

    this.categoryService.getCategory().subscribe({

      next: (response: any) => {

        if (response?.data) {
          this.categories = response.data;
        } else {
          this.categories = response;
        }

      },

      error: (error) => {
        console.error('Category Load Error', error);
      }

    });

  }

  /**
   * Load Sub Categories
   *
   * Replace with your actual service.
   */
  private loadSubCategories(): void {

    this.subCategoryService.getSubCategory().subscribe({

      next: (response: any) => {

        if (response?.data) {
          this.subCategories = response.data;
        } else {
          this.subCategories = response;
        }

      },

      error: (error) => {
        console.error(error);
      }

    });

  }

  /**
 * Add Category
 */
  addCategory(categoryId: string): void {

    if (!categoryId) {
      return;
    }

    const category = this.categories.find(
      c => c._id === categoryId
    );

    if (!category) {
      return;
    }

    const exists = this.categoriesArray.value.some(
      (c: Category) => c._id === category._id
    );

    if (exists) {
      this.selectedCategory = '';
      return;
    }

    this.categoriesArray.push(
      this.fb.control(category)
    );

    this.selectedCategory = '';

  }

  /**
   * Remove Category
   */
  removeCategory(index: number): void {

    this.categoriesArray.removeAt(index);

  }

  get selectedCategories(): Category[] {

    return this.categoriesArray.value;

  }

  /**
 * Add Sub Category
 */
  addSubCategory(subCategoryId: string): void {

    if (!subCategoryId) {
      return;
    }

    const subCategory = this.subCategories.find(
      s => s._id === subCategoryId
    );

    if (!subCategory) {
      return;
    }

    const exists = this.subCategoriesArray.value.some(
      (s: SubCategory) => s._id === subCategory._id
    );

    if (exists) {
      this.selectedSubCategory = '';
      return;
    }

    this.subCategoriesArray.push(
      this.fb.control(subCategory)
    );

    this.selectedSubCategory = '';

  }

  /**
   * Remove Sub Category
   */
  removeSubCategory(index: number): void {

    if (index < 0 || index >= this.subCategoriesArray.length) {
      return;
    }

    this.subCategoriesArray.removeAt(index);

  }

  /**
   * Clear All Sub Categories
   */
  clearSubCategories(): void {

    this.subCategoriesArray.clear();

    this.selectedSubCategory = '';

  }

  /**
   * Check Sub Category Exists
   */
  hasSubCategory(subCategoryId: string): boolean {

    return this.subCategoriesArray.value.some(
      (s: SubCategory) => s._id === subCategoryId
    );

  }

  /**
   * Selected Sub Categories
   */
  get selectedSubCategories(): SubCategory[] {

    return this.subCategoriesArray.value as SubCategory[];

  }


  /**
 * Upload Product Image
 */
  onImageSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    this.imageLoading = true;

    this.categoryService
      .uploadImage(file)
      .subscribe({

        next: (response: any) => {

          this.imageLoading = false;

          let imageUrl = '';

          // API: { data: { url: '' } }
          if (response?.data?.url) {

            imageUrl = response.data.url;

          }
          // API: { url: '' }
          else if (response?.url) {

            imageUrl = response.url;

          }

          if (!imageUrl) {
            return;
          }

          this.images.push(
            this.fb.control(imageUrl)
          );

        },

        error: (error) => {

          this.imageLoading = false;

          console.error('Image Upload Error', error);

        }

      });

  }

  /**
   * Remove Image
   */
  removeImage(index: number): void {

    if (index < 0 || index >= this.images.length) {
      return;
    }

    this.images.removeAt(index);

  }

  /**
   * Preview Image
   */
  previewImage(image: string): void {

    this.viewImageUrl = image;

  }

  /**
   * Close Preview
   */
  closePreview(): void {

    this.viewImageUrl = '';

  }
  /**
   * Image List
   */
  get imageList(): string[] {

    return this.images.value;

  }
  /**
   * Replace Existing Image
   */
  replaceImage(index: number, imageUrl: string): void {

    if (index < 0 || index >= this.images.length) {
      return;
    }

    this.images.at(index).setValue(imageUrl);

  }

  /**
   * Remove All Images
   */
  clearImages(): void {

    this.images.clear();

  }

  /**
   * Check Duplicate Image
   */
  hasImage(url: string): boolean {

    return this.images.value.includes(url);

  }

  /**
   * Add Dynamic Field
   */
  addField(): void {

    const key = this.fieldName.trim();

    if (!key) {
      return;
    }

    if (this.moreDetails.contains(key)) {
      alert('Field already exists.');
      return;
    }

    this.moreDetails.addControl(
      key,
      this.fb.control('', Validators.required)
    );

    this.fieldName = '';

    this.openAddField = false;

  }

  /**
   * Remove Dynamic Field
   */
  removeField(field: string): void {

    if (!this.moreDetails.contains(field)) {
      return;
    }

    this.moreDetails.removeControl(field);

  }

  /**
   * Update Field Value
   */
  updateFieldValue(field: string, value: string): void {

    if (!this.moreDetails.contains(field)) {
      return;
    }

    this.moreDetails.get(field)?.setValue(value);

  }



  /**
   * Get Dynamic Field Value
   */
  getFieldValue(field: string): string {

    return this.moreDetails.get(field)?.value || '';

  }

  /**
   * Dynamic Fields
   */
  get dynamicFields(): { key: string; value: string }[] {

    return Object.keys(this.moreDetails.controls).map(key => ({
      key,
      value: this.moreDetails.get(key)?.value
    }));

  }

  /**
   * Open Add Field Dialog
   */
  openFieldDialog(): void {

    this.fieldName = '';

    this.openAddField = true;

  }

  /**
   * Close Add Field Dialog
   */
  closeFieldDialog(): void {

    this.fieldName = '';

    this.openAddField = false;

  }

  /**
   * Check if Dynamic Field Exists
   */
  hasField(field: string): boolean {

    return this.moreDetails.contains(field);

  }

  /**
   * Convert Dynamic Fields to Object
   */
  getMoreDetails(): { [key: string]: string } {

    const details: { [key: string]: string } = {};

    Object.keys(this.moreDetails.controls).forEach(key => {

      details[key] = this.moreDetails.get(key)?.value;

    });

    return details;

  }

  /**
 * Update Product
 */
  onSubmit(): void {

    if (this.productForm.invalid) {

      this.productForm.markAllAsTouched();

      return;

    }

    this.submitting = true;

    const payload = {

      _id: this.productForm.value._id,

      name: this.productForm.value.name,

      description: this.productForm.value.description,

      image: this.images.value,

      category: this.categoriesArray.value,

      subCategory: this.subCategoriesArray.value,

      unit: this.productForm.value.unit,

      stock: Number(this.productForm.value.stock),

      price: Number(this.productForm.value.price),

      discount: Number(this.productForm.value.discount),

      more_details: this.getMoreDetails()

    };

    this.productService.updateProduct(payload).subscribe({

      next: (response: any) => {

        this.submitting = false;

        console.log('Product Updated', response);

        alert(response.message || 'Product updated successfully.');

        this.refresh.emit();

        this.closeDialog();

      },

      error: (error) => {

        this.submitting = false;

        console.error(error);

        alert(error?.error?.message || 'Unable to update product.');

      }

    });

  }

  /**
   * Reset Form
   */
  resetForm(): void {

    this.productForm.reset();

    this.images.clear();

    this.categoriesArray.clear();

    this.subCategoriesArray.clear();

    Object.keys(this.moreDetails.controls).forEach(key => {

      this.moreDetails.removeControl(key);

    });

  }

  /**
   * Close Dialog
   */
  closeDialog(): void {

    this.close.emit();

  }

  /**
   * Cancel
   */
  cancel(): void {

    this.closeDialog();

  }

  /**
   * Reload Product Data
   */
  reloadProduct(product: Product): void {

    this.product = product;

    this.resetForm();

    this.initializeForm();

  }

  trackByIndex(index: number): number {

    return index;

  }

  trackByCategory(index: number, item: Category): string {

    return item._id;

  }

  trackBySubCategory(index: number, item: SubCategory): string {

    return item._id;

  }

  isInvalid(controlName: string): boolean {

    const control = this.productForm.get(controlName);

    return !!(

      control &&

      control.invalid &&

      (control.dirty || control.touched)

    );

  }
}


