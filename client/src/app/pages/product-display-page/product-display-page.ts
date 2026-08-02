import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { displayPriceInRupees } from '../../core/utils/displayRupee';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product';
import { priceWithDiscount } from '../../core/utils/priceWithDiscount';

@Component({
  selector: 'app-product-display-page',
  standalone: false,
  templateUrl: './product-display-page.html',
  styleUrl: './product-display-page.scss',
})
export class ProductDisplayPage implements OnInit {

  @ViewChild('imageContainer')
  imageContainer!: ElementRef<HTMLDivElement>;

  product: any = {
    _id: '',
    name: '',
    image: [],
    description: '',
    unit: '',
    price: 0,
    discount: 0,
    stock: 0,
    more_details: {}
  };

  loading = false;

  selectedImage = 0;

  productId = '';

  moreDetails: { key: string; value: any }[] = [];

  // Assets
  deliveryImage = 'assets/minute_delivery.png';
  offerImage = 'assets/Best_Prices_Offers.png';
  assortmentImage = 'assets/Wide_Assortment.png';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.productId = params['product']
        .split('-')
        .pop();

      this.loadProduct();

    });

  }

  loadProduct(): void {

    this.loading = true;

    this.productService.getProductDetails(this.productId).subscribe({

      next: (res: any) => {

        if (res.success) {

          this.product = res.data;

          this.selectedImage = 0;

        }

        this.loading = false;

      },

      error: () => {

        this.loading = false;

      }

    });

  }

  // -------------------------
  // Image Gallery
  // -------------------------

  selectImage(index: number): void {

    this.selectedImage = index;

  }

  scrollLeft(): void {

    this.imageContainer.nativeElement.scrollLeft -= 120;

  }

  scrollRight(): void {

    this.imageContainer.nativeElement.scrollLeft += 120;

  }

  // -------------------------
  // Price
  // -------------------------

  displayPriceInRupees(price: number): string {
    return displayPriceInRupees(price);
  }
  
  getDiscountPrice(price: number, discount: number): number {
    return priceWithDiscount(price, discount);
  }

  // -------------------------
  // Details
  // -------------------------

  get detailKeys(): string[] {

    return this.product.more_details
      ? Object.keys(this.product.more_details)
      : [];

  }

}