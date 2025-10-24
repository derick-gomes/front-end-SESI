import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const course = await Course.findById(params.id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const PUT = withAuth(async (request: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const { name, description } = await request.json();
    const course = await Course.findByIdAndUpdate(params.id, { name, description }, { new: true });
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);

export const DELETE = withAuth(async (request: NextRequest, user: any, { params }: { params: { id: string } }) => {
  try {
    await dbConnect();
    const course = await Course.findByIdAndDelete(params.id);
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Course deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);
