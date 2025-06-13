import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurriculoService } from 'src/app/service/curriculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curriculo-form',
  templateUrl: './curriculo-form.component.html',
  styleUrls: ['./curriculo-form.component.scss']
})
export class CurriculoFormComponent implements OnInit {
  curriculoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private curriculoService: CurriculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.curriculoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      linkedin: ['', Validators.required],
      resumo: [''],
      usuarioId: [1] // simulação do usuário logado
    });
  }

  onSubmit(): void {
    if (this.curriculoForm.invalid) {
      return;
    }

    this.curriculoService.createCurriculo(this.curriculoForm.value).subscribe({
      next: () => {
        alert('Currículo cadastrado com sucesso!');
        this.router.navigate(['/meu-curriculo']);
      },
      error: (err) => {
        console.error('Erro ao salvar currículo:', err);
      }
    });
  }
}
