'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Sistema de Gestão Acadêmica</h1>
            <div className="flex items-center space-x-4">
              <span>Olá, {user.name} ({user.role})</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

          {user.role === 'coordinator' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/courses" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg">
                <h3 className="text-lg font-medium">Gerenciar Cursos</h3>
                <p className="text-gray-600">CRUD de cursos</p>
              </a>
              <a href="/classes" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg">
                <h3 className="text-lg font-medium">Gerenciar Turmas</h3>
                <p className="text-gray-600">CRUD de turmas</p>
              </a>
              <a href="/students" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg">
                <h3 className="text-lg font-medium">Gerenciar Alunos</h3>
                <p className="text-gray-600">CRUD de alunos</p>
              </a>
              <a href="/enrollments" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg">
                <h3 className="text-lg font-medium">Matrículas</h3>
                <p className="text-gray-600">Matricular alunos em turmas</p>
              </a>
              <a href="/grades" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg">
                <h3 className="text-lg font-medium">Pauta</h3>
                <p className="text-gray-600">Ver notas e faltas</p>
              </a>
            </div>
          )}

          {user.role === 'teacher' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="/my-classes" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg">
                <h3 className="text-lg font-medium">Minhas Turmas</h3>
                <p className="text-gray-600">Ver turmas e lançar notas</p>
              </a>
            </div>
          )}

          {user.role === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="/my-grades" className="block p-6 bg-white rounded-lg shadow hover:shadow-lg">
                <h3 className="text-lg font-medium">Minhas Notas</h3>
                <p className="text-gray-600">Ver notas e faltas</p>
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
