-- CreateTable
CREATE TABLE "contractor" (
    "id" TEXT NOT NULL,
    "realm" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contractor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contractor_realm_key" ON "contractor"("realm");
