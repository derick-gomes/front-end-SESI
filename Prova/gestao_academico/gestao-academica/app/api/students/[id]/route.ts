import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any, params: { id: string }) => {
  try {
    await dbConnect();
    const student = await Student.findById(params.id);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const PUT = withAuth(async (request: NextRequest, user: any, params: { id: string }) => {
  try {
    await dbConnect();
    const { name, email } = await request.json();
    const student = await Student.findByIdAndUpdate(params.id, { name, email }, { new: true });
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);

export const DELETE = withAuth(async (request: NextRequest, user: any, params: { id: string }) => {
  try {
    await dbConnect();
    const student = await Student.findByIdAndDelete(params.id);
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Student deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);
