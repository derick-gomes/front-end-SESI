'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  _id: string;
  name: string;
}

interface Class {
  _id: string;
  name: string;
  courseId: { _id: string; name: string };
  teacherId: { _id: string; name: string };
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchClasses();
    fetchCourses();
    fetchTeachers();
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

  const fetchCourses = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/courses', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setCourses(data);
    }
  };

  const fetchTeachers = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/students?role=teacher', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setTeachers(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `/api/classes/${editing}` : '/api/classes';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, courseId, teacherId }),
    });

    if (res.ok) {
      fetchClasses();
      setName('');
      setCourseId('');
      setTeacherId('');
      setEditing(null);
    }
  };

  const handleEdit = (cls: Class) => {
    setName(cls.name);
    setCourseId(cls.courseId._id);
    setTeacherId(cls.teacherId._id);
    setEditing(cls._id);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/classes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchClasses();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Gerenciar Turmas</h1>
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <input
                type="text"
                placeholder="Nome da turma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Selecione o curso</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <select
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Selecione o professor</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              {editing ? 'Atualizar' : 'Criar'} Turma
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setName('');
                  setCourseId('');
                  setTeacherId('');
                }}
                className="mt-4 ml-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancelar
              </button>
            )}
          </form>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {classes.map((cls) => (
                <li key={cls._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{cls.name}</h3>
                      <p className="text-gray-600">Curso: {cls.courseId.name}</p>
                      <p className="text-gray-600">Professor: {cls.teacherId.name}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(cls)}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(cls._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Deletar
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
