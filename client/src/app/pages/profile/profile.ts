import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { setUserDetails } from '../../store/user/user.actions';
import { AppState } from '../../store/reducers';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfilePage implements OnInit {

  profileForm!: FormGroup;

  user: any = {};

  loading = false;

  openProfileAvatarEdit = false;

  closeProfileAvatarEdit() {
    this.openProfileAvatarEdit = false;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    });

    this.store.select('user').subscribe((user: any) => {
      this.user = user;

      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        mobile: user.mobile
      });
    });

  }

  handleSubmit() {

    if (this.profileForm.invalid) {
      return;
    }

    this.loading = true;

    this.userService.updateUser(this.profileForm.value).subscribe({

      next: (res: any) => {

        this.toastr.success(res.message);

        // Fetch latest user
        this.userService.getUserDetails().subscribe({

          next: (userRes: any) => {

            this.store.dispatch(
              setUserDetails({ user: userRes.data })
            );

          }

        });

        this.loading = false;

      },

      error: (err) => {

        this.toastr.error(err.error?.message || 'Update failed');

        this.loading = false;

      }

    });

  }

}