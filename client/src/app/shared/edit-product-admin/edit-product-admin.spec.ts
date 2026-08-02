import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductAdmin } from './edit-product-admin';

describe('EditProductAdmin', () => {
  let component: EditProductAdmin;
  let fixture: ComponentFixture<EditProductAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
