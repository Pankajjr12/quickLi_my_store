import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { logout } from '../../store/user/user.actions';
import { UserState } from '../../store/user/user.reducer';
import { ToastrService } from 'ngx-toastr';
import { isAdmin } from '../../core/utils/is-admin';

@Component({
  selector: 'app-user-menu',
  standalone: false,
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  @Output() close = new EventEmitter<void>();

  user!: UserState;
  isAdmin = isAdmin;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) {
    this.store.select(state => state.user).subscribe(user => {
      this.user = user;
    });
  }

  handleClose(): void {
    this.close.emit();
  }


  handleLogout(): void {

    this.authService.logout().subscribe({

      next: (response: any) => {

        if (response.success) {

          this.handleClose();

          this.store.dispatch(logout());

          localStorage.clear();

          this.toast.success(response.message);

          this.router.navigate(['/']);
        }

      },

      error: (error) => {

        console.error(error);

        this.toast.error(
          error?.error?.message || 'Logout failed'
        );

      }

    });

  }

}