import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchPage implements OnInit {

  data: any[] = [];
  loading = true;
  loadingArrayCard = Array(10).fill(null);

  page = 1;
  limit = 10;
  searchText = '';
  totalPage = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.searchText = (params['q'] || '').trim();
      this.page = 1;
    
      if (!this.searchText) {
        this.data = [];
        this.loading = false;
        return;
      }
    
      this.fetchData();
    });

  }


  fetchData() {
    this.loading = true;
  
    this.productService
      .searchProduct(this.page, this.limit, this.searchText)
      .subscribe({
        next: (response: any) => {
  
          if (response.success) {
  
            if (this.page === 1) {
              this.data = response.data;
            } else {
              this.data = [...this.data, ...response.data];
            }
  
            this.totalPage = response.totalPage;
          }
  
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  handleFetchMore() {

    if (this.page < this.totalPage) {
      this.page++;
      this.fetchData();
    }

  }

}
