type InviteRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

type AddMemberParams = {
  workspaceId: number;
  inviteeUserId: string;
  role: InviteRole;
};

type AddMemberResponse<T = unknown> = {
  message: string;
  data?: T;
};

export async function addMemberFetch({
  workspaceId,
  inviteeUserId,
  role,
}: AddMemberParams) {
  const response = await fetch('/api/invite/addmember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      workspaceId,
      inviteeUserId,
      role,
    }),
  });

  const result = (await response.json()) as AddMemberResponse;

  if (!response.ok) {
    throw new Error(result.message || '멤버 초대에 실패했습니다.');
  }

  return result;
}
