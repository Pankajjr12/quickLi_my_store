import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, finalize, Subject } from 'rxjs';
import { ProductService } from '../../core/services/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-admin',
  standalone: false,
  templateUrl: './product-admin.html',
  styleUrl: './product-admin.scss',
})
export class ProductAdmin implements OnInit {

  products: any[] = [];

  page = 1;
  totalPageCount = 1;

  loading = false;
  search = '';

  private searchSubject = new Subject<string>();

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.fetchProducts();

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {

        this.page = 1;
        this.fetchProducts();

      });

  }

  fetchProducts(): void {

    this.loading = true;
  
    const request =
      this.search.trim()
        ? this.productService.searchProduct(this.page, 12, this.search)
        : this.productService.getProducts(this.page, 12, '');
  
    request
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response: any) => {
  
          if (response.success) {
            this.products = response.data;
        
            this.totalPageCount = response.totalPage ?? response.totalNoPage ?? 1;
        
            console.log("totalPage =", response.totalPage);
            console.log("totalNoPage =", response.totalNoPage);
          }
  
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        }
      });
  }

  onSearch(event: Event): void {

    this.search = (event.target as HTMLInputElement).value;

    this.searchSubject.next(this.search);

  }

  nextPage(): void {
    console.log('Next clicked');
  
    if (this.page < this.totalPageCount) {
      this.page++;
      console.log('Loading page', this.page);
      this.fetchProducts();
    }
  }
  
  previousPage(): void {
    console.log('Previous clicked');
  
    if (this.page > 1) {
      this.page--;
      console.log('Loading page', this.page);
      this.fetchProducts();
    }
  }

}
