import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category';
import { SubCategoryService } from '../../core/services/sub-category';
import { Router } from '@angular/router';
import { validURLConvert } from '../../core/utils/valideURLConvert';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage implements  OnInit, OnDestroy {

  loadingCategory = true;

  categories: any[] = [];
  subCategories: any[] = [];

  banners: string[] = [
    '/images/bn1.png',
    '/images/b2.png',
    '/images/b3.png',
    '/images/bn6.png',
    '/images/bn5.png',
    '/images/b4.png',
  ];

  currentBanner = 0;
  private bannerInterval: any;

  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubCategories();
    this.startBannerSlider();
  }

  ngOnDestroy(): void {
    if (this.bannerInterval) {
      clearInterval(this.bannerInterval);
    }
  }

  startBannerSlider(): void {
    this.bannerInterval = setInterval(() => {
      this.currentBanner =
        (this.currentBanner + 1) % this.banners.length;
    }, 5000);
  }

  nextBanner(): void {
    this.currentBanner =
      (this.currentBanner + 1) % this.banners.length;

    this.restartTimer();
  }

  previousBanner(): void {
    this.currentBanner =
      (this.currentBanner - 1 + this.banners.length) %
      this.banners.length;

    this.restartTimer();
  }

  goToBanner(index: number): void {
    this.currentBanner = index;
    this.restartTimer();
  }

  restartTimer(): void {
    clearInterval(this.bannerInterval);
    this.startBannerSlider();
  }

  loadCategories(): void {
    this.categoryService.getCategory().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.loadingCategory = false;
      }
    });
  }

  loadSubCategories(): void {
    this.subCategoryService.getSubCategory().subscribe({
      next: (res: any) => {
        this.subCategories = res.data;
      }
    });
  }

  openCategory(category: any): void {

    const sub = this.subCategories.find((s: any) =>
      s.category.some((c: any) => c._id === category._id)
    );
  
    if (!sub) return;
  
    const categoryParam =
      `${validURLConvert(category.name)}-${category._id}`;
  
    const subCategoryParam =
      `${validURLConvert(sub.name)}-${sub._id}`;
  
    this.router.navigate([
      categoryParam,
      subCategoryParam
    ]);
  }
}