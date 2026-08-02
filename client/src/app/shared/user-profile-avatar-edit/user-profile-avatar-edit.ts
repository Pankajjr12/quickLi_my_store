import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserService } from '../../core/services/user';
import { ToastrService } from 'ngx-toastr';
import { updatedAvatar } from '../../store/user/user.actions';

@Component({
  selector: 'app-user-profile-avatar-edit',
  standalone: false,
  templateUrl: './user-profile-avatar-edit.html',
  styleUrl: './user-profile-avatar-edit.scss',
})
export class UserProfileAvatarEdit {

  @Output() close = new EventEmitter<void>();

  user: any = {};

  loading = false;

  constructor(
    private store: Store<any>,
    private userService: UserService,
    private toastr: ToastrService
  ) {

    this.store.select((state: any) => state.user).subscribe(user => {
      this.user = user;
    });

  }

  closeModal() {
    this.close.emit();
  }

  uploadAvatar(event: any) {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    this.loading = true;

    this.userService.uploadAvatar(formData).subscribe({

      next: (response: any) => {

        this.loading = false;

        this.toastr.success(response.message);

        this.store.dispatch(
          updatedAvatar({
            avatar: response.data.avatar
          })
        );

      },

      error: (err) => {

        this.loading = false;

        this.toastr.error(
          err.error?.message || 'Upload failed'
        );

      }

    });

  }

}
