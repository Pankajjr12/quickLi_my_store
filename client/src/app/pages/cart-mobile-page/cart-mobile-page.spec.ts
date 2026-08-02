import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMobilePage } from './cart-mobile-page';

describe('CartMobilePage', () => {
  let component: CartMobilePage;
  let fixture: ComponentFixture<CartMobilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartMobilePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
