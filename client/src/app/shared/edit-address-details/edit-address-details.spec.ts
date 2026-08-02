import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressDetails } from './edit-address-details';

describe('EditAddressDetails', () => {
  let component: EditAddressDetails;
  let fixture: ComponentFixture<EditAddressDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAddressDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddressDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
