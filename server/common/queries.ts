import { prisma } from '@/lib/prisma';
export async function getWorkspaceMembership(
  userId: string,
  workspaceId: number,
) {
  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });
  if (!membership) {
    throw new Error('Not a workspace member');
  }

  return membership;
}
