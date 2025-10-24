import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Em produção, o token viria da URL (query params ou route params)
    // Para demo, usamos o token armazenado localmente
    this.token = localStorage.getItem('resetToken') || '';
    if (!this.token) {
      this.errorMessage = 'Token inválido ou expirado';
    }
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.resetForm.valid && this.token) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { password } = this.resetForm.value;

      this.authService.resetPassword(this.token, password).subscribe({
        next: (success) => {
          this.isLoading = false;
          if (success) {
            this.successMessage = 'Senha alterada com sucesso! Redirecionando para login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.errorMessage = 'Erro ao alterar senha. Token pode ter expirado.';
          }
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao alterar senha. Tente novamente.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.resetForm.controls).forEach(key => {
      const control = this.resetForm.get(key);
      control?.markAsTouched();
    });
  }

  get password() { return this.resetForm.get('password'); }
  get confirmPassword() { return this.resetForm.get('confirmPassword'); }
}
