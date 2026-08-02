import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../shared/services/global-service';
import { AddressService } from '../../core/services/address-service';
import { ToastrService } from 'ngx-toastr';
import * as AddressActions from '../../store/address/address.actions'
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.html',
  styleUrl: './address.scss',
})
export class AddressPage implements OnInit {

  addresses: any[] = [];

  openAddress = false;
  openEdit = false;
  editData: any = {};

  loading = false;

  constructor(
    private store: Store<AppState>,
    private addressService: AddressService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    // Get addresses from NgRx Store
    this.store.select('address').subscribe((state: any) => {
      this.addresses = state.addresses || [];
    });

    this.fetchAddress();
  }

  /**
   * Fetch Address List
   */
  fetchAddress(): void {

    this.loading = true;

    this.addressService.getAddress().subscribe({
      next: (res: any) => {

        this.loading = false;

        if (res.success) {
          this.store.dispatch(
            AddressActions.setAddresses({
              addresses: res.data
            })
          );
        }

      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }

  /**
   * Open Add Address Modal
   */
  addAddress(): void {
    this.openAddress = true;
  }

  /**
   * Open Edit Address Modal
   */
  editAddress(address: any): void {

    console.log("Edit Clicked");
    console.log(address);
    this.editData = address;
    this.openEdit = true;
  }

  deleteAddress(id: string): void {

    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    this.addressService.deleteAddress(id).subscribe({
      next: (res: any) => {

        if (res.success) {

          this.store.dispatch(
            AddressActions.deleteAddress({
              _id: id
            })
          );

          this.toastr.success(
            'Address deleted successfully.',
            'Success'
          );

          this.fetchAddress();

        } else {

          this.toastr.error(
            res.message || 'Unable to delete address.',
            'Error'
          );

        }

      },
      error: () => {

        this.toastr.error(
          'Something went wrong.',
          'Error'
        );

      }
    });

  }

  /**
   * Close Add Modal
   */
  closeAddModal(): void {
    this.openAddress = false;
    this.fetchAddress();
  }

  /**
   * Close Edit Modal
   */
  closeEditModal(): void {
    this.openEdit = false;
    this.fetchAddress();
  }

}