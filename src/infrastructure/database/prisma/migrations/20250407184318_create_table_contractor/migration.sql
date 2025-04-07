-- CreateTable
CREATE TABLE "contractor" (
    "id" TEXT NOT NULL,
    "realmUnique" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contractor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contractor_realmUnique_key" ON "contractor"("realmUnique");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_email_key" ON "contractor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_phone_key" ON "contractor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_company_name_key" ON "contractor"("company_name");
