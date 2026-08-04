import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product';
import { SubCategoryService } from '../../core/services/sub-category';
import { validURLConvert } from '../../core/utils/valideURLConvert';

@Component({
  selector: 'app-product-list-page',
  standalone: false,
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.scss',
})
export class ProductListPage implements OnInit {

  products: any[] = [];
  displaySubCategory: any[] = [];
  loadingCards = Array(8);

  loading = false;

  page = 1;
  limit = 8;
  totalPage = 1;
  subCategoryLoading = true;
  categoryId = '';
  subCategoryId = '';
  subCategoryName = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.categoryId = params['category'].split('-').pop();

      this.subCategoryId = params['subCategory'].split('-').pop();

      const sub = params['subCategory'].split('-');

      this.subCategoryName = sub
        .slice(0, sub.length - 1)
        .join(' ');

      this.page = 1;

      this.loadProducts();
      this.loadSubCategories();

    });

  }

  loadProducts(): void {

    this.loading = true;

    this.productService.getProductsByCategoryAndSubCategory({
      categoryId: this.categoryId,
      subCategoryId: this.subCategoryId,
      page: this.page,
      limit: this.limit
    }).subscribe({

      next: (res: any) => {

        if (res.success) {

          if (this.page === 1) {
            this.products = res.data;
          } else {
            this.products = [...this.products, ...res.data];
          }

          this.totalPage = res.totalCount;
        }

        this.loading = false;

      },

      error: () => {
        this.loading = false;
      }

    });

  }

  loadSubCategories(): void {

    this.subCategoryLoading = true;
  
    this.subCategoryService.getSubCategory().subscribe({
  
      next: (res: any) => {
  
        this.displaySubCategory = res.data.filter((sub: any) =>
          sub.category.some((cat: any) => cat._id === this.categoryId)
        );
  
        this.subCategoryLoading = false;
      },
  
      error: () => {
        this.subCategoryLoading = false;
      }
  
    });
  
  }

  changeSubCategory(sub: any): void {

    this.subCategoryId = sub._id;

    this.subCategoryName = sub.name;

    this.page = 1;

    this.loadProducts();

  }

  validURLConvert(value: string): string {
    return validURLConvert(value);
  }

}