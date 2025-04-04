/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `client_master` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "client_master_email_key" ON "client_master"("email");
