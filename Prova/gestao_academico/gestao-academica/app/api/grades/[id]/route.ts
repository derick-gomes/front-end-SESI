import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Grade from '@/models/Grade';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any, params: { id: string }) => {
  try {
    await dbConnect();
    const grade = await Grade.findById(params.id).populate('studentId', 'name').populate('classId', 'name');
    if (!grade) {
      return NextResponse.json({ error: 'Grade not found' }, { status: 404 });
    }
    return NextResponse.json(grade);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const PUT = withAuth(async (request: NextRequest, user: any, params: { id: string }) => {
  try {
    await dbConnect();
    const { grade, absence } = await request.json();
    const updatedGrade = await Grade.findByIdAndUpdate(params.id, { grade, absence }, { new: true });
    if (!updatedGrade) {
      return NextResponse.json({ error: 'Grade not found' }, { status: 404 });
    }
    return NextResponse.json(updatedGrade);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['teacher']);

export const DELETE = withAuth(async (request: NextRequest, user: any, params: { id: string }) => {
  try {
    await dbConnect();
    const grade = await Grade.findByIdAndDelete(params.id);
    if (!grade) {
      return NextResponse.json({ error: 'Grade not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Grade deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['teacher']);
