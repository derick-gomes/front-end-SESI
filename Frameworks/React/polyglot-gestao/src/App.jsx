// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// IMPORTANDO COMPONENTES (default export)
import Login from './pages/Auth/Login';
import DashboardCoord from './pages/Coordinator/Dashboard';
import DashboardProf from './pages/Professor/Dashboard';
import PautaTurma from './pages/Coordinator/PautaTurma';
import LancarNotas from './pages/Coordinator/LancarNotas';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard-coord" element={<DashboardCoord />} />
        <Route path="/dashboard-prof" element={<DashboardProf />} />
        <Route path="/pauta-turma" element={<PautaTurma />} />
        <Route path="/lancar-notas" element={<LancarNotas />} />
      </Routes>
    </Router>
  );
}

export default App;
