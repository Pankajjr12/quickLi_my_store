import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubCategory } from './edit-sub-category';

describe('EditSubCategory', () => {
  let component: EditSubCategory;
  let fixture: ComponentFixture<EditSubCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSubCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSubCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
