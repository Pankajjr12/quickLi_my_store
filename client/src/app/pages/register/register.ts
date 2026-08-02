import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone :false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterPage {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  constructor(private toastr: ToastrService,private authService:AuthService) {}

  showPassword = false;
  showConfirmPassword = false;

  readonly registerForm = this.fb.group(
    {
      name: ['', [Validators.required]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      confirmPassword: ['', [
        Validators.required
      ]]
    },
    {
      validators: this.passwordMatchValidator
    }
  );

  get f() {
    return this.registerForm.controls;
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  handleSubmit(): void {

    if (this.registerForm.hasError('passwordMismatch')) {
      this.toastr.error('Password and Confirm Password should match.');
      return;
    }
  
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields correctly.');
      return;
    }
  
    const payload = this.registerForm.getRawValue();
  
    console.log(payload);
  
    this.authService.register(payload).subscribe({
      next: () => {
        this.toastr.success('Registration successful.');
        this.registerForm.reset({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'Registration failed.');
      }
    });

  }
}