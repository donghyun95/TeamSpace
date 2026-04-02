import { PrismaClient, WorkspaceType, WorkspaceRole } from '@prisma/client';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { hashPassword } from '@/lib/password';
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

async function main() {
  const hashedPassword = await hashPassword('test1234!');

  // 유저 생성
  const seedUser = await prisma.user.create({
    data: {
      email: 'seed-owner@example.com',
      password: hashedPassword,
      name: 'Seed Owner User',
      image: 'https://example.com/seed-owner.png',
    },
  });

  const otherOwnerUser = await prisma.user.create({
    data: {
      email: 'seed-other-owner@example.com',
      password: hashedPassword,
      name: 'Seed Other Owner',
      image: 'https://example.com/seed-other-owner.png',
    },
  });

  const viewerUser = await prisma.user.create({
    data: {
      email: 'seed-viewer@example.com',
      password: hashedPassword,
      name: 'Seed Viewer User',
      image: 'https://example.com/seed-viewer.png',
    },
  });

  // 워크스페이스 생성
  const personalWorkspace = await prisma.workspace.create({
    data: {
      name: 'Seed Personal Workspace',
      type: WorkspaceType.PERSONAL,
    },
  });

  const teamWorkspace = await prisma.workspace.create({
    data: {
      name: 'Seed Team Workspace',
      type: WorkspaceType.TEAM,
    },
  });

  const sharedWorkspace = await prisma.workspace.create({
    data: {
      name: 'Seed Shared Workspace',
      type: WorkspaceType.TEAM,
    },
  });

  // 멤버십 생성
  // seedUser는 총 3개 워크스페이스 소속
  // - personalWorkspace: OWNER
  // - teamWorkspace: OWNER
  // - sharedWorkspace: VIEWER
  await prisma.workspaceMember.createMany({
    data: [
      {
        userId: seedUser.id,
        workspaceId: personalWorkspace.id,
        role: WorkspaceRole.OWNER,
      },
      {
        userId: seedUser.id,
        workspaceId: teamWorkspace.id,
        role: WorkspaceRole.OWNER,
      },
      {
        userId: seedUser.id,
        workspaceId: sharedWorkspace.id,
        role: WorkspaceRole.VIEWER,
      },

      {
        userId: otherOwnerUser.id,
        workspaceId: sharedWorkspace.id,
        role: WorkspaceRole.OWNER,
      },
      {
        userId: otherOwnerUser.id,
        workspaceId: teamWorkspace.id,
        role: WorkspaceRole.ADMIN,
      },

      {
        userId: viewerUser.id,
        workspaceId: personalWorkspace.id,
        role: WorkspaceRole.VIEWER,
      },
      {
        userId: viewerUser.id,
        workspaceId: teamWorkspace.id,
        role: WorkspaceRole.MEMBER,
      },
    ],
  });

  async function createPage(params: {
    workspaceId: number;
    authorId?: string | null;
    title: string;
    icon?: string | null;
    parentId?: number | null;
    order?: number;
  }) {
    return prisma.page.create({
      data: {
        workspaceId: params.workspaceId,
        authorId: params.authorId ?? null,
        title: params.title,
        icon: params.icon ?? null,
        parentId: params.parentId ?? null,
        order: params.order ?? 0,
      },
    });
  }

  // =========================
  // 1) PERSONAL WORKSPACE
  // depth 5 트리 생성
  // =========================
  const personalRoot = await createPage({
    workspaceId: personalWorkspace.id,
    authorId: seedUser.id,
    title: 'Personal Home',
    icon: '🏠',
    order: 0,
  });

  const personalDepth2 = await createPage({
    workspaceId: personalWorkspace.id,
    authorId: seedUser.id,
    title: 'Projects',
    icon: '📁',
    parentId: personalRoot.id,
    order: 0,
  });

  const personalDepth3 = await createPage({
    workspaceId: personalWorkspace.id,
    authorId: seedUser.id,
    title: '2026 Roadmap',
    icon: '🗺️',
    parentId: personalDepth2.id,
    order: 0,
  });

  const personalDepth4 = await createPage({
    workspaceId: personalWorkspace.id,
    authorId: seedUser.id,
    title: 'Q2 Goals',
    icon: '🎯',
    parentId: personalDepth3.id,
    order: 0,
  });

  const personalDepth5 = await createPage({
    workspaceId: personalWorkspace.id,
    authorId: seedUser.id,
    title: 'Launch Checklist',
    icon: '✅',
    parentId: personalDepth4.id,
    order: 0,
  });

  // 같은 루트 아래 형제 페이지
  await createPage({
    workspaceId: personalWorkspace.id,
    authorId: seedUser.id,
    title: 'Daily Notes',
    icon: '📝',
    parentId: personalRoot.id,
    order: 1,
  });

  await createPage({
    workspaceId: personalWorkspace.id,
    authorId: seedUser.id,
    title: 'Archive',
    icon: '🗄️',
    parentId: personalRoot.id,
    order: 2,
  });

  // depth 5 아래 추가 자식
  await createPage({
    workspaceId: personalWorkspace.id,
    authorId: seedUser.id,
    title: 'Appendix',
    icon: '📎',
    parentId: personalDepth5.id,
    order: 0,
  });

  // =========================
  // 2) TEAM WORKSPACE
  // =========================
  const teamRoot = await createPage({
    workspaceId: teamWorkspace.id,
    authorId: seedUser.id,
    title: 'Team Home',
    icon: '👥',
    order: 0,
  });

  const teamSpec = await createPage({
    workspaceId: teamWorkspace.id,
    authorId: seedUser.id,
    title: 'Product Spec',
    icon: '📘',
    parentId: teamRoot.id,
    order: 0,
  });

  const teamMeeting = await createPage({
    workspaceId: teamWorkspace.id,
    authorId: otherOwnerUser.id,
    title: 'Meeting Notes',
    icon: '📅',
    parentId: teamRoot.id,
    order: 1,
  });

  await createPage({
    workspaceId: teamWorkspace.id,
    authorId: seedUser.id,
    title: 'API',
    icon: '🔌',
    parentId: teamSpec.id,
    order: 0,
  });

  await createPage({
    workspaceId: teamWorkspace.id,
    authorId: otherOwnerUser.id,
    title: 'Sprint Board',
    icon: '🏃',
    parentId: teamMeeting.id,
    order: 0,
  });

  // =========================
  // 3) SHARED WORKSPACE
  // seedUser는 VIEWER
  // =========================
  const sharedRoot = await createPage({
    workspaceId: sharedWorkspace.id,
    authorId: otherOwnerUser.id,
    title: 'Shared Docs',
    icon: '🤝',
    order: 0,
  });

  await createPage({
    workspaceId: sharedWorkspace.id,
    authorId: otherOwnerUser.id,
    title: 'Read Only Guide',
    icon: '👀',
    parentId: sharedRoot.id,
    order: 0,
  });

  console.log('✅ Seed complete');
  console.log('--------------------------------');
  console.log('seed user');
  console.log('email: seed-owner@example.com');
  console.log('password: test1234!');
  console.log('--------------------------------');
  console.log(`personal workspace id: ${personalWorkspace.id}`);
  console.log(`team workspace id: ${teamWorkspace.id}`);
  console.log(`shared workspace id: ${sharedWorkspace.id}`);
  console.log(`depth 5 page id: ${personalDepth5.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
