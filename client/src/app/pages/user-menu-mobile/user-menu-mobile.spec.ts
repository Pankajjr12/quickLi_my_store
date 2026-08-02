import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuMobile } from './user-menu-mobile';

describe('UserMenuMobile', () => {
  let component: UserMenuMobile;
  let fixture: ComponentFixture<UserMenuMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMenuMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
