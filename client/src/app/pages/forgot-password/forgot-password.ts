import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  isLoading = false;

  readonly forgotPasswordForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],
  });

  get f() {
    return this.forgotPasswordForm.controls;
  }

  handleSubmit(): void {

    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      this.toastr.error('Please enter a valid email.');
      return;
    }

    this.isLoading = true;

    const payload = this.forgotPasswordForm.getRawValue();

    this.authService.forgotPassword(payload).subscribe({

      next: (response: any) => {

        this.toastr.success(response.message);

        this.forgotPasswordForm.reset();

        this.router.navigate(
          ['/verification-otp'],
          {
            state: payload
          }
        );

        this.isLoading = false;
      },

      error: () => {
        this.isLoading = false;
      }

    });

  }

}