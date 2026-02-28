// import {
//   PrismaClient,
//   Prisma,
//   WorkspaceType,
//   WorkspaceRole,
// } from "../app/generated/prisma/client";
import "dotenv/config";
import {
  PrismaClient,
  WorkspaceMember,
  WorkspaceType,
  WorkspaceRole,
} from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});
async function main() {
  console.log("🌱 Seeding...");

  // --------------------
  // Users
  // --------------------
  const alice = await prisma.user.upsert({
    where: {
      email: "alice@test.com",
    },
    update: {
      name: "Alice",
    },
    create: {
      email: "alice@test.com",
      name: "Alice",
    },
  });
  const bob = await prisma.user.upsert({
    where: {
      email: "bob@test.com",
    },
    update: {
      name: "Bob",
    },
    create: {
      email: "bob@test.com",
      name: "Bob",
    },
  });

  // --------------------
  // Personal Workspace (Alice)
  // --------------------
  const personalWs = await prisma.workspace.create({
    data: {
      name: "Alice Personal",
      type: WorkspaceType.PERSONAL,
    },
  });

  await prisma.workspaceMember.create({
    data: {
      userId: alice.id,
      workspaceId: personalWs.id,
      role: WorkspaceRole.OWNER,
    },
  });

  // --------------------
  // Team Workspace
  // --------------------
  const teamWs = await prisma.workspace.create({
    data: {
      name: "Frontend Team",
      type: WorkspaceType.TEAM,
    },
  });

  await prisma.workspaceMember.createMany({
    data: [
      {
        userId: alice.id,
        workspaceId: teamWs.id,
        role: WorkspaceRole.OWNER,
      },
      {
        userId: bob.id,
        workspaceId: teamWs.id,
        role: WorkspaceRole.MEMBER,
      },
    ],
  });

  // --------------------
  // Pages (Tree)
  // --------------------
  const rootPage = await prisma.page.create({
    data: {
      workspaceId: teamWs.id,
      title: "Project Docs",
      order: 0,
      authorId: alice.id,
    },
  });

  const child1 = await prisma.page.create({
    data: {
      workspaceId: teamWs.id,
      parentId: rootPage.id,
      title: "API Spec",
      order: 0,
      authorId: alice.id,
    },
  });

  await prisma.page.create({
    data: {
      workspaceId: teamWs.id,
      parentId: rootPage.id,
      title: "UI Planning",
      order: 1,
      authorId: bob.id,
    },
  });

  await prisma.page.create({
    data: {
      workspaceId: teamWs.id,
      parentId: child1.id,
      title: "Auth Flow",
      order: 0,
      authorId: alice.id,
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
