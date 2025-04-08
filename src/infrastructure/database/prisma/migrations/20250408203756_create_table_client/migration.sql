-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "consumer" TEXT NOT NULL,
    "contractor_id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_id_key" ON "client"("id");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_contractor_id_fkey" FOREIGN KEY ("contractor_id") REFERENCES "contractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
