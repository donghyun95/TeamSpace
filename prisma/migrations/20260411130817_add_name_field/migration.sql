/*
  Warnings:

  - The values [REVOKED] on the enum `WorkspaceInviteStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorkspaceInviteStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');
ALTER TABLE "public"."WorkspaceInvite" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "WorkspaceInvite" ALTER COLUMN "status" TYPE "WorkspaceInviteStatus_new" USING ("status"::text::"WorkspaceInviteStatus_new");
ALTER TYPE "WorkspaceInviteStatus" RENAME TO "WorkspaceInviteStatus_old";
ALTER TYPE "WorkspaceInviteStatus_new" RENAME TO "WorkspaceInviteStatus";
DROP TYPE "public"."WorkspaceInviteStatus_old";
ALTER TABLE "WorkspaceInvite" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "color" TEXT;
