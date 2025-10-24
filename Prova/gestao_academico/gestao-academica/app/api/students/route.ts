import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    const students = await Student.find({});
    return NextResponse.json(students);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const POST = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    const { name, email } = await request.json();
    const student = new Student({ name, email });
    await student.save();
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);
