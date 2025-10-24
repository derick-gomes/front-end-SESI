'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Grade {
  _id: string;
  classId: { _id: string; name: string; courseId: { name: string } };
  grade: number;
  absence: boolean;
  date: string;
}

export default function MyGradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchMyGrades();
  }, []);

  const fetchMyGrades = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/grades?my=true', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setGrades(data);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Minhas Notas</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {grades.map((grade) => (
                <li key={grade._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {grade.classId.name} - {grade.classId.courseId.name}
                      </h3>
                      <p className="text-gray-600">
                        Nota: {grade.grade} | Falta: {grade.absence ? 'Sim' : 'Não'} | Data: {new Date(grade.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
