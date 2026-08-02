import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSubCategory } from './upload-sub-category';

describe('UploadSubCategory', () => {
  let component: UploadSubCategory;
  let fixture: ComponentFixture<UploadSubCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadSubCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSubCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
