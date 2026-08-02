import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token';
import { AuthService } from '../../core/services/auth';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user';
import { setUserDetails } from '../../store/user/user.actions';
import { Store } from '@ngrx/store';
import { GlobalService } from '../../shared/services/global-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly tokenService = inject(TokenService);

  constructor(private toastr: ToastrService, private globalService: GlobalService, private store: Store, private authService: AuthService, private userService: UserService) { }

  showPassword = false;
  isLoading = false;

  readonly loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],
    password: [
      '',
      [
        Validators.required,
      ],
    ],
  });

  get f() {
    return this.loginForm.controls;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  handleSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields correctly.');
      return;
    }

    this.isLoading = true;

    const payload = this.loginForm.getRawValue();

    this.authService.login(payload).subscribe({

      next: (response: any) => {

        this.tokenService.saveTokens(
          response.data.accesstoken,
          response.data.refreshToken
        );

        // Fetch logged in user
        this.userService.getUserDetails().subscribe({

          next: (userResponse: any) => {

            if (userResponse.success) {

              this.store.dispatch(
                setUserDetails({
                  user: userResponse.data
                })
              );

            }

            this.toastr.success(response.message);

            this.loginForm.reset();

            this.router.navigate(['/']);
            this.globalService.fetchCartItem();

            this.isLoading = false;
          },

          error: () => {

            this.toastr.success(response.message);

            this.router.navigate(['/']);

            this.isLoading = false;
          }

        });

      },

      error: (error) => {

        this.toastr.error(
          error.error?.message || 'Login failed.'
        );

        this.isLoading = false;
      }

    });

  }
}