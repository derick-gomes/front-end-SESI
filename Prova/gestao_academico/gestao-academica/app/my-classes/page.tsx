'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Class {
  _id: string;
  name: string;
  courseId: { _id: string; name: string };
}

interface Grade {
  _id: string;
  studentId: { _id: string; name: string };
  grade: number;
  absence: boolean;
  date: string;
}

export default function MyClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [grades, setGrades] = useState<Grade[]>([]);
  const [grade, setGrade] = useState('');
  const [absence, setAbsence] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchMyClasses();
  }, []);

  const fetchMyClasses = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/classes?my=true', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setClasses(data);
    } else {
      router.push('/login');
    }
  };

  const fetchEnrolledStudents = async (classId: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/enrollments?classId=${classId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setEnrolledStudents(data);
    }
  };

  const fetchGrades = async (classId: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/grades?classId=${classId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setGrades(data);
    }
  };

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId);
    fetchEnrolledStudents(classId);
    fetchGrades(classId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('/api/grades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ studentId, classId: selectedClass, grade: parseFloat(grade), absence }),
    });

    if (res.ok) {
      fetchGrades(selectedClass);
      setGrade('');
      setAbsence(false);
      setStudentId('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Minhas Turmas</h1>
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
            <>
              <form onSubmit={handleSubmit} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Lançar Nota/Falta</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <select
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Selecione o aluno</option>
                    {enrolledStudents.map((enrollment) => (
                      <option key={enrollment.studentId._id} value={enrollment.studentId._id}>
                        {enrollment.studentId.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    placeholder="Nota (0-10)"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required={!absence}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={absence}
                      onChange={(e) => setAbsence(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Falta</label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Lançar
                </button>
              </form>

              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <h2 className="text-xl font-semibold p-6">Notas e Faltas</h2>
                <ul className="divide-y divide-gray-200">
                  {grades.map((g) => (
                    <li key={g._id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{g.studentId.name}</h3>
                          <p className="text-gray-600">
                            Nota: {g.grade} | Falta: {g.absence ? 'Sim' : 'Não'} | Data: {new Date(g.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
