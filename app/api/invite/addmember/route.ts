import { NextRequest, NextResponse } from 'next/server';
import { inviteUser } from '@/server/invite/queries';
import { auth } from '@/lib/auth';
import { getWorkspaceMembership } from '@/server/common/queries';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      //user 검증
      return NextResponse.json('인증되지 않은 사용자입니다.', { status: 401 });
    }

    const body = await req.json();
    const { workspaceId, inviteeUserId, role } = body;
    const VerifyRole = await getWorkspaceMembership(userId, workspaceId);
    if (VerifyRole.role !== 'OWNER') {
      return NextResponse.json('Error', { status: 400 });
    }
    const invite = await inviteUser({
      workspaceId,
      inviterId: userId,
      inviteeUserId,
      role,
    });

    return NextResponse.json(
      {
        message: '초대가 생성되었습니다.',
        data: invite,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('[POST /app/invite/addmember]', error);

    return NextResponse.json('Error', { status: 401 });
  }
}
