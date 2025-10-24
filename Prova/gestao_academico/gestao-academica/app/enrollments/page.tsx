'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Student {
  _id: string;
  name: string;
}

interface Class {
  _id: string;
  name: string;
  courseId: { _id: string; name: string };
}

interface Enrollment {
  _id: string;
  studentId: { _id: string; name: string };
  classId: { _id: string; name: string; courseId: { name: string } };
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchEnrollments();
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchEnrollments = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/enrollments', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setEnrollments(data);
    } else {
      router.push('/login');
    }
  };

  const fetchStudents = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/students', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setStudents(data);
    }
  };

  const fetchClasses = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/classes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setClasses(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('/api/enrollments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ studentId, classId }),
    });

    if (res.ok) {
      fetchEnrollments();
      setStudentId('');
      setClassId('');
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/enrollments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchEnrollments();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Matrículas</h1>
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
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Selecione o aluno</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Selecione a turma</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name} - {cls.courseId.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Matricular Aluno
            </button>
          </form>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {enrollments.map((enrollment) => (
                <li key={enrollment._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{enrollment.studentId.name}</h3>
                      <p className="text-gray-600">Turma: {enrollment.classId.name} - {enrollment.classId.courseId.name}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(enrollment._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Desmatricular
                      </button>
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
