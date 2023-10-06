/*
  Warnings:

  - You are about to drop the column `Hut` on the `Games` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "Hut",
ADD COLUMN     "hut" TEXT;
