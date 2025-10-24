import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { email } = this.forgotForm.value;

      this.authService.forgotPassword(email).subscribe({
        next: (success) => {
          this.isLoading = false;
          if (success) {
            this.successMessage = 'Email de recuperação enviado! Verifique sua caixa de entrada.';
            setTimeout(() => {
              this.router.navigate(['/reset-password']);
            }, 3000);
          } else {
            this.errorMessage = 'Email não encontrado';
          }
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao enviar email. Tente novamente.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.forgotForm.controls).forEach(key => {
      const control = this.forgotForm.get(key);
      control?.markAsTouched();
    });
  }

  get email() { return this.forgotForm.get('email'); }
}
