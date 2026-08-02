import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../core/services/address-service';
import { Store } from '@ngrx/store';
import * as AddressActions from '../../store/address/address.actions'

@Component({
  selector: 'app-edit-address-details',
  standalone: false,
  templateUrl: './edit-address-details.html',
  styleUrl: './edit-address-details.scss',
})
export class EditAddressDetails implements OnInit {

  @Input() data: any;
  @Output() close = new EventEmitter<void>();

  addressForm!: FormGroup;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private store: Store
  ) {}

  ngOnInit(): void {

    this.addressForm = this.fb.group({
      _id: [this.data?._id],
      userId: [this.data?.userId],
      address_line: [this.data?.address_line, Validators.required],
      city: [this.data?.city, Validators.required],
      state: [this.data?.state, Validators.required],
      country: [this.data?.country, Validators.required],
      pincode: [this.data?.pincode, Validators.required],
      mobile: [this.data?.mobile, Validators.required]
    });
    console.log("Edit Component Loaded");
    console.log(this.data);
  }

  submit(): void {

    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.addressService
      .updateAddress(this.addressForm.value)
      .subscribe({
        next: (res: any) => {

          this.loading = false;

          if (res.success) {

            this.store.dispatch(
              AddressActions.updateAddress({
                address: res.data
              })
            );

            this.close.emit();
          }

        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        }
      });

  }

  closeModal(): void {
    this.close.emit();
  }

}