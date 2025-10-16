import React from 'react';
import { useParams } from 'react-router-dom';

function PautaTurma() {
  const { turmaId } = useParams();

  const alunos = [
    { id: 1, nome: 'Ana', nota: 8, faltas: 2 },
    { id: 2, nome: 'Bruno', nota: 5, faltas: 7 },
  ];

  const calcularStatus = (nota, faltas) => {
    if (faltas > 5) return 'Reprovado por faltas';
    if (nota >= 7) return 'Aprovado';
    return 'Reprovado por nota';
  };

  return (
    <div>
      <h2>Pauta da Turma {turmaId}</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Nota</th>
            <th>Faltas</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.nota}</td>
              <td>{aluno.faltas}</td>
              <td>{calcularStatus(aluno.nota, aluno.faltas)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PautaTurma;
