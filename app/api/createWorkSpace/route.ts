import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { createWorkSpace } from '@/server/create/queries';

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return errorResponse('LOGIN_REQUIRED', 401);
    }
    const userID = session.user?.id;

    if (!userID) {
      return errorResponse('INVALID_SESSION', 401);
    }

    const result = await createWorkSpace(userID);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }
}
