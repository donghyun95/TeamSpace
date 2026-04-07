/*
  Warnings:

  - A unique constraint covering the columns `[publictoken]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "ispublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publictoken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Page_publictoken_key" ON "Page"("publictoken");
