import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../core/services/address-service';
import { GlobalService } from '../services/global-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-address',
  standalone: false,
  templateUrl: './add-address.html',
  styleUrl: './add-address.scss',
})
export class AddAddress {

  @Output() close = new EventEmitter<void>();


  addressForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private globalService: GlobalService,
    private toastr: ToastrService
  ) {


    this.addressForm = this.fb.group({

      addressline: [
        '',
        Validators.required
      ],

      city: [
        '',
        Validators.required
      ],

      state: [
        '',
        Validators.required
      ],

      country: [
        '',
        Validators.required
      ],

      pincode: [
        '',
        Validators.required
      ],

      mobile: [
        '',
        Validators.required
      ]

    });


  }



  submit() {


    if (this.addressForm.invalid) {

      this.addressForm.markAllAsTouched();

      return;

    }



    const form = this.addressForm.value;



    const data = {

      address_line: form.addressline,

      city: form.city,

      state: form.state,

      country: form.country,

      pincode: form.pincode,

      mobile: form.mobile

    };



    this.addressService.createAddress(data)
      .subscribe({

        next: (res: any) => {


          if (res.success) {

            this.toastr.success(res.message);


            this.globalService.fetchAddress();


            this.addressForm.reset();


            this.close.emit();

          }


        },


        error: (err) => {

          console.log(err);

          this.toastr.error("Something went wrong");

        }


      })


  }



  closeModal() {

    this.close.emit();

  }


}
