import { getWorkspaceMembership } from '@/server/common/queries';
import { renameWorkspace } from '@/server/workspace/queries';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ workspaceId: string }> },
) {
  try {
    const { name } = await req.json();
    const { workspaceId } = await params;
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'LOGIN_REQUIRED' }, { status: 401 });
    }
    const userId = session.user?.id;

    const numberWorkspaceId = Number(workspaceId);

    // 1. 파라미터 검증
    if (!Number.isFinite(numberWorkspaceId) || !userId) {
      return NextResponse.json({ error: 'Invalid params' }, { status: 400 });
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Invalid workspace name' },
        { status: 400 },
      );
    }

    // 2. 멤버십 체크
    const membership = await getWorkspaceMembership(userId, numberWorkspaceId);

    if (!membership) {
      return NextResponse.json(
        { error: 'Workspace not found or no access' },
        { status: 404 },
      );
    }

    // 권한 체크
    if (membership.role !== 'OWNER' && membership.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 3. 업데이트
    const updated = await renameWorkspace(numberWorkspaceId, name);

    return NextResponse.json(updated);
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: e?.message ?? 'Unknown error',
      },
      { status: 500 },
    );
  }
}
