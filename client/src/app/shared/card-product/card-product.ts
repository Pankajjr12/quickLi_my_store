import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { displayPriceInRupees } from '../../core/utils/displayRupee';

@Component({
  selector: 'app-card-product',
  standalone: false,
  templateUrl: './card-product.html',
  styleUrl: './card-product.scss',
})
export class CardProduct {
  @Input() product: any;

  displayPriceInRupees = displayPriceInRupees;

  constructor(private router: Router) {}

  validURLConvert(value: string): string {
    return value
      ?.replaceAll(' ', '-')
      .replaceAll(',', '-')
      .replaceAll('&', '-');
  }

  getDiscountPrice(price: number, discount: number): number {
    if (!discount) return price;
    return price - (price * discount) / 100;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  }

  openProduct(): void {
    this.router.navigate([
      '/product',
      `${this.validURLConvert(this.product.name)}-${this.product._id}`,
    ]);
  }
}