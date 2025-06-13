import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurriculoService } from 'src/app/service/curriculo.service';
import { Curriculo } from 'src/app/models/curriculo.model';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss']
})
export class CurriculosComponent implements OnInit {
  curriculos: Curriculo[] = [];

  constructor(
    private curriculoService: CurriculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCurriculos();
  }

  carregarCurriculos(): void {
    this.curriculoService.getCurriculos().subscribe({
      next: (data: Curriculo[]) => {
        this.curriculos = data;
      },
      error: (err: any) => {
        console.error('Erro ao carregar currículos:', err);
      }
    });
  }

  editarCurriculo(id: number): void {
    this.router.navigate(['/curriculos/editar', id]);
  }

  deletarCurriculo(id: number): void {
    if (confirm('Deseja realmente excluir este currículo?')) {
      this.curriculoService.deleteCurriculo(id).subscribe({
        next: () => {
          this.curriculos = this.curriculos.filter(c => c.id !== id);
        },
        error: (err: any) => {
          console.error('Erro ao excluir currículo:', err);
        }
      });
    }
  }
}
