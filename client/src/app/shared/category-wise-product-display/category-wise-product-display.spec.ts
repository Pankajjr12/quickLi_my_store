import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseProductDisplay } from './category-wise-product-display';

describe('CategoryWiseProductDisplay', () => {
  let component: CategoryWiseProductDisplay;
  let fixture: ComponentFixture<CategoryWiseProductDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryWiseProductDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryWiseProductDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
