import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'LOGIN_REQUIRED' }, { status: 401 });
    }

    const memberships = await prisma.workspaceMember.findMany({
      where: { userId },
      select: {
        workspaceId: true,
        role: true,
      },
    });

    const roleMap = new Map(memberships.map((m) => [m.workspaceId, m.role]));
    const workspaceIds = memberships.map((m) => m.workspaceId);

    if (workspaceIds.length === 0) {
      return NextResponse.json({ pages: [] });
    }

    const trashPages = await prisma.page.findMany({
      where: {
        workspaceId: { in: workspaceIds },
        deletedAt: { not: null },
      },
      select: {
        id: true,
        title: true,
        icon: true,
        workspaceId: true,
        parentId: true,
        deletedAt: true,
        parent: {
          select: {
            id: true,
            deletedAt: true,
          },
        },
        workspace: {
          select: {
            name: true,
            type: true,
          },
        },
      },
      orderBy: {
        deletedAt: 'desc',
      },
    });

    return NextResponse.json({
      pages: trashPages.map((page) => ({
        ...page,
        role: roleMap.get(page.workspaceId) ?? 'VIEWER',
        parentDeleted: Boolean(page.parent?.deletedAt),
      })),
    });
  } catch {
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }
}
