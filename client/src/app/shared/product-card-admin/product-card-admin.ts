import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../core/services/product';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product-card-admin',
  standalone: false,
  templateUrl: './product-card-admin.html',
  styleUrl: './product-card-admin.scss',
})
export class ProductCardAdmin {

  @Input() product: any;

  @Output() refresh = new EventEmitter<void>();

  editOpen = false;
  openDelete = false;
  deleting = false;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  //-----------------------------------------
  // Edit
  //-----------------------------------------

  openEdit(): void {
    this.editOpen = true;
  }

  closeEdit(): void {
    this.editOpen = false;
  }

  //-----------------------------------------
  // Delete Modal
  //-----------------------------------------

  openDeleteModal(): void {
    this.openDelete = true;
  }

  closeDeleteModal(): void {
    if (!this.deleting) {
      this.openDelete = false;
    }
  }

  //-----------------------------------------
  // Delete Product
  //-----------------------------------------

  deleteProduct(): void {

    if (!this.product?._id) {
      this.toastr.warning('Invalid product.');
      return;
    }

    this.deleting = true;

    this.productService
      .deleteProduct({
        _id: this.product._id
      })
      .pipe(
        finalize(() => {
          this.deleting = false;
        })
      )
      .subscribe({

        next: (response: any) => {

          if (response?.success) {

            this.toastr.success(
              response.message || 'Product deleted successfully.'
            );

            this.openDelete = false;

            this.refresh.emit();

          } else {

            this.toastr.error(
              response?.message || 'Unable to delete product.'
            );

          }

        },

        error: (error) => {

          console.error(error);

          this.toastr.error(
            error?.error?.message || `Product don't exists. Unable to delete product.`
          );

        }

      });

  }

}