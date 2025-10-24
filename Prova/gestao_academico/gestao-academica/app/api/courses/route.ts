import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import { withAuth } from '@/lib/middleware';

export const GET = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    const courses = await Course.find({});
    return NextResponse.json(courses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator', 'teacher']);

export const POST = withAuth(async (request: NextRequest, user: any) => {
  try {
    await dbConnect();
    const { name, description } = await request.json();
    const course = new Course({ name, description });
    await course.save();
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}, ['coordinator']);
