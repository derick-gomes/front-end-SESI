import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any, params: { id: string }) => {
  try {
    await dbConnect();
    const enrollment = await Enrollment.findById(params.id).populate('studentId', 'name').populate('classId', 'name');
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }
    return NextResponse.json(enrollment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const DELETE = withAuth(async (request: NextRequest, user: any, params: { id: string }) => {
  try {
    await dbConnect();
    const enrollment = await Enrollment.findByIdAndDelete(params.id);
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Enrollment deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);
