import React from 'react';
import { Link } from 'react-router-dom';

function DashboardCoord() {
  return (
    <div>
      <h2>Dashboard do Coordenador</h2>
      <ul>
        <li><Link to="/coord/pauta/1">Ver Pauta da Turma 1</Link></li>
        {/* Adicione mais links aqui depois */}
      </ul>
    </div>
  );
}

export default DashboardCoord;

