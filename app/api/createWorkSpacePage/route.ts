import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { createWorkSpacePage } from '@/server/create/queries';

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return errorResponse('LOGIN_REQUIRED', 401);
    }

    const body = await req.json();
    const userID = session.user?.id;

    if (!userID) {
      return errorResponse('INVALID_SESSION', 401);
    }

    const workspaceID = Number(body.workspaceID);

    if (!Number.isInteger(workspaceID) || workspaceID <= 0) {
      return errorResponse('INVALID_WORKSPACE_ID', 400);
    }

    if (body.parentId === null) {
      const result = await createWorkSpacePage(userID, workspaceID, null);
      return NextResponse.json(result, { status: 201 });
    }

    const parentID = Number(body.parentId);

    if (!Number.isInteger(parentID) || parentID <= 0) {
      return errorResponse('INVALID_PARENT_ID', 400);
    }

    const result = await createWorkSpacePage(userID, workspaceID, parentID);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }
}
