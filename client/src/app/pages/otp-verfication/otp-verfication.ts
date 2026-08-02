import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-otp-verfication',
  standalone: false,
  templateUrl: './otp-verfication.html',
  styleUrl: './otp-verfication.scss',
})
export class OtpVerfication implements OnInit {

  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef>;

  email = history.state.email;
  otpForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      otp: this.fb.array([])
    });
  }



  ngOnInit(): void {

    if (!this.email) {
      this.router.navigate(['/forgot-password']);
      return;
    }

    for (let i = 0; i < 6; i++) {
      this.otpArray.push(
        this.fb.control('', [
          Validators.required,
          Validators.maxLength(1)
        ])
      );
    }
  }

  get otpArray(): FormArray {
    return this.otpForm.get('otp') as FormArray;
  }

  onInput(event: Event, index: number): void {

    const input = event.target as HTMLInputElement;

    const value = input.value.replace(/[^0-9]/g, '');

    input.value = value;

    this.otpArray.at(index).setValue(value);

    if (value && index < 5) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }

  }

  onKeyDown(event: KeyboardEvent, index: number): void {

    if (
      event.key === 'Backspace' &&
      !this.otpArray.at(index).value &&
      index > 0
    ) {
      this.otpInputs.get(index - 1)?.nativeElement.focus();
    }

  }

  verifyOtp(): void {

    if (this.otpForm.invalid) {
      return;
    }

    const payload = {
      email: this.email,
      otp: this.otpArray.value.join('')
    };

    console.log(payload);

    this.authService.verifyOtpforgotPassword(payload).subscribe({

      next: (res: any) => {

        console.log(res);

        if (res.success) {

          this.router.navigate(['/reset-password'], {
            state: {
              email: this.email,
              data: res
            }
          });

        }

      },

      error: (err) => {
        console.log(err);
      }

    });

  }

}