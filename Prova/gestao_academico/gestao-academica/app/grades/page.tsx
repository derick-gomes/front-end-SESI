'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Class {
  _id: string;
  name: string;
  courseId: { name: string };
}

interface GradeSummary {
  studentId: { _id: string; name: string };
  grades: { grade: number; absence: boolean; date: string }[];
  average: number;
  absences: number;
}

export default function GradesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [gradesSummary, setGradesSummary] = useState<GradeSummary[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/classes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setClasses(data);
    } else {
      router.push('/login');
    }
  };

  const fetchGradesSummary = async (classId: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/grades?classId=${classId}&summary=true`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setGradesSummary(data);
    }
  };

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId);
    fetchGradesSummary(classId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Pauta</h1>
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
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Selecione uma turma</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((cls) => (
                <button
                  key={cls._id}
                  onClick={() => handleClassSelect(cls._id)}
                  className={`p-4 border rounded-lg text-left hover:bg-gray-50 ${
                    selectedClass === cls._id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                  }`}
                >
                  <h3 className="font-medium">{cls.name}</h3>
                  <p className="text-gray-600">{cls.courseId.name}</p>
                </button>
              ))}
            </div>
          </div>

          {selectedClass && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <h2 className="text-xl font-semibold p-6">Pauta da Turma</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aluno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Faltas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Média
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {gradesSummary.map((summary) => (
                    <tr key={summary.studentId._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {summary.studentId.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {summary.grades.map((g, index) => (
                          <span key={index} className="mr-2">
                            {g.grade} ({new Date(g.date).toLocaleDateString()})
                          </span>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {summary.absences}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {summary.average.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
