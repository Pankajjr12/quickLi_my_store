import { Component, EventEmitter, Input, Output } from '@angular/core';
import { validURLConvert } from '../../core/utils/valideURLConvert';

@Component({
  selector: 'app-category-sidebar',
  standalone: false,
  templateUrl: './category-sidebar.html',
  styleUrl: './category-sidebar.scss',
})
export class CategorySidebar {
  @Input() categories: any[] = [];
  @Input() loading = false;
  @Input() selectedCategoryId = '';

  @Output() categoryClick = new EventEmitter<any>();

  selectCategory(category: any) {
    this.categoryClick.emit(category);
  }
}
