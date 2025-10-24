import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Grade from '@/models/Grade';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    let grades;
    if (user.role === 'teacher') {
      // Teachers see grades for their classes
      const classes = await dbConnect().then(() => require('@/models/Class').default.find({ teacherId: user.userId }).select('_id'));
      const classIds = classes.map((c: any) => c._id);
      grades = await Grade.find({ classId: { $in: classIds } }).populate('studentId', 'name').populate('classId', 'name');
    } else {
      grades = await Grade.find({}).populate('studentId', 'name').populate('classId', 'name');
    }
    return NextResponse.json(grades);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const POST = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    const { studentId, classId, grade, absence, date } = await request.json();
    const newGrade = new Grade({ studentId, classId, grade, absence, date });
    await newGrade.save();
    return NextResponse.json(newGrade, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['teacher']);
