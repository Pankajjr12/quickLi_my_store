import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCartItem } from './display-cart-item';

describe('DisplayCartItem', () => {
  let component: DisplayCartItem;
  let fixture: ComponentFixture<DisplayCartItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCartItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCartItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
