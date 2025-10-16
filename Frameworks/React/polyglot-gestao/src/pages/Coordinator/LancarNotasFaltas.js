import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function LancarNotasFaltas() {
  const { turmaId } = useParams();
  const [alunos, setAlunos] = useState([
    { id: 1, nome: 'Ana', nota: '', faltas: '' },
    { id: 2, nome: 'Bruno', nota: '', faltas: '' },
  ]);

  const handleChange = (id, campo, valor) => {
    setAlunos(alunos.map(aluno =>
      aluno.id === id ? { ...aluno, [campo]: valor } : aluno
    ));
  };

  const salvar = () => {
    console.log('Notas e faltas salvas:', alunos);
    alert('Dados salvos (simulação)');
  };

  return (
    <div>
      <h2>Lançar Notas - Turma {turmaId}</h2>
      {alunos.map(aluno => (
        <div key={aluno.id}>
          <strong>{aluno.nome}</strong><br />
          Nota: <input
            value={aluno.nota}
            onChange={(e) => handleChange(aluno.id, 'nota', e.target.value)}
          /><br />
          Faltas: <input
            value={aluno.faltas}
            onChange={(e) => handleChange(aluno.id, 'faltas', e.target.value)}
          /><br /><br />
        </div>
      ))}
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}

export default LancarNotasFaltas;
