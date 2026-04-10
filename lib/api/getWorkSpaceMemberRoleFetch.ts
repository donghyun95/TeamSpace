export async function WorkspaceMemberRole(workspaceId: number, userId: string) {
  const res = await fetch(
    `/api/workspaces/${workspaceId}/members/${userId}/role`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch role');
  }

  const data = await res.json();
  return data.role as 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER' | null;
}
