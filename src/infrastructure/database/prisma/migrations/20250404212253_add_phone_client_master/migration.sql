/*
  Warnings:

  - Added the required column `phone` to the `client_master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client_master" ADD COLUMN     "phone" TEXT NOT NULL;
