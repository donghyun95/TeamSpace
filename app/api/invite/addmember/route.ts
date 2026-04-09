import { NextRequest, NextResponse } from 'next/server';
import { inviteUser } from '@/server/invite/queries';
import { auth } from '@/lib/auth';

const VALID_ROLES = ['OWNER', 'ADMIN', 'MEMBER', 'VIEWER'] as const;
type Role = (typeof VALID_ROLES)[number];

type AddMemberRequestBody = {
  workspaceId: number;
  inviteeUserId: string;
  role: Role;
};

function isValidRole(role: unknown): role is Role {
  return typeof role === 'string' && VALID_ROLES.includes(role as Role);
}

function validateRequestBody(body: unknown):
  | {
      success: true;
      data: AddMemberRequestBody;
    }
  | {
      success: false;
      message: string;
    } {
  if (!body || typeof body !== 'object') {
    return {
      success: false,
      message: '요청 본문이 올바르지 않습니다.',
    };
  }

  const { workspaceId, inviteeUserId, role } =
    body as Partial<AddMemberRequestBody>;

  if (typeof workspaceId !== 'number') {
    return {
      success: false,
      message: 'workspaceId는 number여야 합니다.',
    };
  }

  if (typeof inviteeUserId !== 'string' || inviteeUserId.trim() === '') {
    return {
      success: false,
      message: 'inviteeUserId는 비어 있지 않은 string이어야 합니다.',
    };
  }

  if (!isValidRole(role)) {
    return {
      success: false,
      message: 'role은 OWNER | ADMIN | MEMBER | VIEWER 중 하나여야 합니다.',
    };
  }

  return {
    success: true,
    data: {
      workspaceId,
      inviteeUserId,
      role,
    },
  };
}

function getInviterId(req: NextRequest): string | null {
  // 실제 서비스에서는 세션/토큰 기반 인증으로 교체하는 것이 좋습니다.
  return req.headers.get('x-user-id');
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

function mapServiceErrorToResponse(error: Error) {
  switch (error.message) {
    case '워크스페이스 멤버가 아닙니다.':
      return errorResponse(error.message, 403);

    case '초대 권한이 없습니다.':
      return errorResponse(error.message, 403);

    case '자기 자신은 초대할 수 없습니다.':
      return errorResponse(error.message, 400);

    case '이미 워크스페이스 멤버입니다.':
      return errorResponse(error.message, 400);

    case '이미 대기 중인 초대가 있습니다.':
      return errorResponse(error.message, 400);

    default:
      return errorResponse('서버 내부 오류가 발생했습니다.', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      //user 검증
      return errorResponse('인증되지 않은 사용자입니다.', 401);
    }

    const body = await req.json();
    const { workspaceId, inviteeUserId, role } = body;

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

    if (error instanceof Error) {
      return mapServiceErrorToResponse(error);
    }

    return errorResponse('서버 내부 오류가 발생했습니다.', 500);
  }
}
