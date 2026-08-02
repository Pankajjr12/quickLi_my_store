import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UploadCategory } from '../../shared/upload-category/upload-category';
import { EditCategory } from '../../shared/edit-category/edit-category';
import { ConfirmBox } from '../../shared/confirm-box/confirm-box';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class CategoryPage implements OnInit {

  loading = false;
  categoryData: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchCategory();
  }

  fetchCategory() {

    this.loading = true;

    this.categoryService.getCategory().subscribe({

      next: (res: any) => {

        this.loading = false;

        if (res.success) {
          this.categoryData = res.data;
        }

      },

      error: () => {
        this.loading = false;
      }

    });

  }

  openEdit(category: any): void {

    const dialogRef = this.dialog.open(EditCategory, {
      width: '650px',
      maxWidth: '95vw',
      disableClose: true,
      data: category
    });
  
    dialogRef.afterClosed().subscribe(result => {
  
      if (result) {
        this.fetchCategory();   // Refresh categories immediately
      }
  
    });
  
  }
  
  deleteCategory(category: any): void {

    const dialogRef = this.dialog.open(ConfirmBox, {
      width: '420px',
      disableClose: true,
      data: {
        title: 'Delete Category',
        message: `Are you sure you want to permanently delete "${category.name}"?`
      }
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {
  
      if (!confirmed) {
        return;
      }
  
      this.loading = true;
  
      this.categoryService.deleteCategory(category._id).subscribe({
  
        next: (res: any) => {
  
          this.loading = false;
  
          if (res.success) {
  
            this.toastr.success(
              res.message || 'Category deleted successfully'
            );
  
            this.fetchCategory();
  
          } else {
  
            this.toastr.error(
              res.message || 'Failed to delete category'
            );
  
          }
  
        },
  
        error: (err) => {
  
          this.loading = false;
  
          this.toastr.error(
            err.error?.message || 'Something went wrong'
          );
  
        }
  
      });
  
    });
  
  }

  openUploadCategory() {

    const dialogRef = this.dialog.open(UploadCategory, {

      width: '700px',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.fetchCategory();
      }

    });

  }

}