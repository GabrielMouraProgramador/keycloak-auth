/*
  Warnings:

  - A unique constraint covering the columns `[url_base]` on the table `contractor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url_base` to the `contractor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contractor" ADD COLUMN     "url_base" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "contractor_url_base_key" ON "contractor"("url_base");
