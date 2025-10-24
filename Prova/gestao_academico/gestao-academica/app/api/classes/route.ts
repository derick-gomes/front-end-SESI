import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Class from '@/models/Class';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    let classes;
    if (user.role === 'teacher') {
      classes = await Class.find({ teacherId: user.userId }).populate('courseId', 'name');
    } else {
      classes = await Class.find({}).populate('courseId', 'name').populate('teacherId', 'name');
    }
    return NextResponse.json(classes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const POST = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    const { name, courseId, teacherId } = await request.json();
    const newClass = new Class({ name, courseId, teacherId });
    await newClass.save();
    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);
