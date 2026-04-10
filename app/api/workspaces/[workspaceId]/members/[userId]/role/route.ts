import { getWorkspaceMembership } from '@/server/common/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ workspaceId: string; userId: string }>;
  },
) {
  try {
    const { workspaceId: workspaceIdParam, userId } = await params;
    const workspaceId = Number(workspaceIdParam);

    if (!Number.isFinite(workspaceId) || !userId) {
      return NextResponse.json({ error: 'invalid params' }, { status: 400 });
    }

    const result = await getWorkspaceMembership(userId, workspaceId);

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to get user role' },
      { status: 500 },
    );
  }
}
