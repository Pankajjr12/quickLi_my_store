import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoading } from './card-loading';

describe('CardLoading', () => {
  let component: CardLoading;
  let fixture: ComponentFixture<CardLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
