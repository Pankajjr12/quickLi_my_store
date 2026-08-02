import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerfication } from './otp-verfication';

describe('OtpVerfication', () => {
  let component: OtpVerfication;
  let fixture: ComponentFixture<OtpVerfication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpVerfication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpVerfication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
