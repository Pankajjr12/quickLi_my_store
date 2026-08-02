import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../core/services/product';
import { SubCategoryService } from '../../core/services/sub-category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-wise-product-display',
  standalone: false,
  templateUrl: './category-wise-product-display.html',
  styleUrl: './category-wise-product-display.scss',
})
export class CategoryWiseProductDisplay implements OnInit {

  @Input() id!: string;
  @Input() name!: string;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  showArrow = false;

private updateArrowVisibility() {
  const width = window.innerWidth;

  if (width >= 1024) {
    this.showArrow = this.products.length > 5;
  } else if (width >= 640) {
    this.showArrow = this.products.length > 3;
  } else {
    this.showArrow = this.products.length > 2;
  }
}

@HostListener('window:resize')
onResize() {
  this.updateArrowVisibility();
}

  products: any[] = [];
  subCategories: any[] = [];
  loading = false;
  loadingCards = Array(6);

  constructor(
    private productService: ProductService,
    private subCategoryService: SubCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadSubCategories();
  }
  loadProducts() {
    this.loading = true;
  
    this.productService.getProductsByCategory(this.id).subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.loading = false;
  
        this.updateArrowVisibility();   // <-- Add this
      },
      error: () => this.loading = false
    });
  }

  loadSubCategories() {
    this.subCategoryService.getSubCategory().subscribe({
      next: (res: any) => {
        this.subCategories = res.data;
      }
    });
  }

  

  validURLConvert(value: string): string {
    return value
      ?.replaceAll(' ', '-')
      .replaceAll(',', '-')
      .replaceAll('&', '-');
  }

  getRedirectUrl() {

    const sub = this.subCategories.find((s: any) =>
      s.category.some((c: any) => c._id === this.id)
    );

    if (!sub) return null;

    return [
      this.validURLConvert(this.name) + '-' + this.id,
      this.validURLConvert(sub.name) + '-' + sub._id
    ];
  }

  seeAll() {

    const url = this.getRedirectUrl();

    if (url) {
      this.router.navigate(url);
    }
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollLeft -= 250;
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollLeft += 250;
  }

}