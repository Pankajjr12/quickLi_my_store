import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCategory } from './upload-category';

describe('UploadCategory', () => {
  let component: UploadCategory;
  let fixture: ComponentFixture<UploadCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
