import { Component } from '@angular/core';
import { SubCategoryService } from '../../core/services/sub-category';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UploadSubCategory } from '../../shared/upload-sub-category/upload-sub-category';
import { EditSubCategory } from '../../shared/edit-sub-category/edit-sub-category';
import { ConfirmBox } from '../../shared/confirm-box/confirm-box';
import { ViewImage } from '../../shared/view-image/view-image';

@Component({
  selector: 'app-sub-category',
  standalone: false,
  templateUrl: './sub-category.html',
  styleUrl: './sub-category.scss',
})
export class SubCategoryPage {

  loading = false;

  subCategoryData: any[] = [];
  searchText = '';

allSubCategoryData: any[] = [];

  columns = [
    {
      header: 'Name',
      field: 'name'
    },
    {
      header: 'Image',
      field: 'image',
      type: 'image',
      onClick: (row: any) => this.openImage(row.image)
    },
    {
      header: 'Category',
      field: 'category',
      type: 'categories'
    },
    {
      header: 'Action',
      type: 'actions',
      onEdit: (row: any) => this.openEdit(row),
      onDelete: (row: any) => this.deleteSubCategory(row)
    }
  ];

  constructor(
    private service: SubCategoryService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchSubCategory();
  }

  fetchSubCategory() {

    this.loading = true;
  
    this.service.getSubCategory().subscribe({
  
      next: (res: any) => {
  
        this.loading = false;
  
        if (res.success) {
  
          this.allSubCategoryData = res.data;
          this.subCategoryData = [...res.data];
  
        }
  
      },
  
      error: () => {
  
        this.loading = false;
  
      }
  
    });
  
  }

  filterSubCategories() {

    const search = this.searchText.trim().toLowerCase();
  
    if (!search) {
      this.subCategoryData = [...this.allSubCategoryData];
      return;
    }
  
    this.subCategoryData = this.allSubCategoryData.filter(item => {
  
      const subCategoryName = item.name?.toLowerCase() || '';
  
      const categoryNames = item.category
        ?.map((c: any) => c.name.toLowerCase())
        .join(' ') || '';
  
      return (
        subCategoryName.includes(search) ||
        categoryNames.includes(search)
      );
  
    });
  
  }

  openUploadSubCategory() {

    this.dialog.open(UploadSubCategory, {
      width: '700px'
    }).afterClosed().subscribe(result => {

      if (result) {

        this.fetchSubCategory();

      }

    });

  }

  openEdit(item: any) {

    this.dialog.open(EditSubCategory, {
      width: '700px',
      data: item
    }).afterClosed().subscribe(result => {

      if (result) {

        this.fetchSubCategory();

      }

    });

  }

  openImage(image: string) {

    this.dialog.open(ViewImage, {

      data: image

    });

  }

  deleteSubCategory(item: any) {

    this.dialog.open(ConfirmBox, {

      width: '420px',

      data: {

        title: 'Delete Sub Category',

        message: `Delete "${item.name}" ?`

      }

    }).afterClosed().subscribe(result => {

      if (!result) return;

      this.service.deleteSubCategory(item._id).subscribe({

        next: (res: any) => {

          if (res.success) {

            this.toastr.success(res.message);

            this.fetchSubCategory();

          }

        }

      });

    });

  }

}