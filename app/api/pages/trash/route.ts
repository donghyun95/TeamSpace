import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getWorkspaceTrashPages } from '@/server/page/queries';

export async function GET(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'LOGIN_REQUIRED' }, { status: 401 });
    }

    const userId = session.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'INVALID_SESSION' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const workspaceId = Number(searchParams.get('workspaceId'));

    if (!Number.isFinite(workspaceId)) {
      return NextResponse.json({ error: 'INVALID_WORKSPACE_ID' }, { status: 400 });
    }

    const pages = await getWorkspaceTrashPages(workspaceId, userId);

    return NextResponse.json({ pages });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNKNOWN_ERROR';

    if (message === 'Not a workspace member') {
      return NextResponse.json({ error: message }, { status: 403 });
    }

    console.error('GET /api/pages/trash error:', error);

    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }
}
