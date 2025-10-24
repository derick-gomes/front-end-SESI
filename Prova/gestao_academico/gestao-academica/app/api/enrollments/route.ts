import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    const enrollments = await Enrollment.find({}).populate('studentId', 'name').populate('classId', 'name');
    return NextResponse.json(enrollments);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const POST = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    const { studentId, classId } = await request.json();
    const enrollment = new Enrollment({ studentId, classId });
    await enrollment.save();
    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);
