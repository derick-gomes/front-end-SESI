import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from './auth';

export function withAuth(handler: (request: NextRequest, user: any, params?: any) => Promise<NextResponse>, allowedRoles?: string[]) {
  return async (request: NextRequest, params?: any) => {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return handler(request, user, params);
  };
}
