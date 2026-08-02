import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileAvatarEdit } from './user-profile-avatar-edit';

describe('UserProfileAvatarEdit', () => {
  let component: UserProfileAvatarEdit;
  let fixture: ComponentFixture<UserProfileAvatarEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileAvatarEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileAvatarEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
