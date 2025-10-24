import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Class from '@/models/Class';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const classData = await Class.findById(params.id).populate('courseId', 'name').populate('teacherId', 'name');
    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }
    return NextResponse.json(classData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const PUT = withAuth(async (request: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const { name, courseId, teacherId } = await request.json();
    const classData = await Class.findByIdAndUpdate(params.id, { name, courseId, teacherId }, { new: true });
    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }
    return NextResponse.json(classData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);

export const DELETE = withAuth(async (request: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const classData = await Class.findByIdAndDelete(params.id);
    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Class deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);
