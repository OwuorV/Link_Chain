/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shop_ownerId_key" ON "public"."Shop"("ownerId");
