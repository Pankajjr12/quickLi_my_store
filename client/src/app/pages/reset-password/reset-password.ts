import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly authService = inject(AuthService);
  isLoading = false;

  showPassword = false;
  showConfirmPassword = false;

  readonly email = history.state.email;
  readonly success = history.state.data?.success;

  readonly resetPasswordForm = this.fb.group({
    email: [this.email],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  get f() {
    return this.resetPasswordForm.controls;
  }

  ngOnInit(): void {

    if (!this.success) {
      this.router.navigate(['/']);
    }

  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  handleSubmit(): void {

    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields.');
      return;
    }

    const payload = this.resetPasswordForm.getRawValue();

    if (payload.newPassword !== payload.confirmPassword) {
      this.toastr.error('Passwords do not match.');
      return;
    }

    this.isLoading = true;

    this.authService.resetPassword(payload).subscribe({

      next: (response: any) => {

        this.toastr.success(response.message);

        this.resetPasswordForm.reset();

        this.router.navigate(['/login']);

        this.isLoading = false;

      },

      error: () => {
        this.isLoading = false;
      }

    });

  }

}