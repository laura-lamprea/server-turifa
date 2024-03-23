-- CreateTable
CREATE TABLE "Numbers" (
    "id" TEXT NOT NULL,
    "num" TEXT,
    "name" TEXT,
    "phone" TEXT,
    "invoice_id" TEXT,
    "payment_status" TEXT,
    "isReserved" BOOLEAN NOT NULL DEFAULT false,
    "creation_date" TIMESTAMP(3),
    "update_date" TIMESTAMP(3),

    CONSTRAINT "Numbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RejectedNumbers" (
    "id" TEXT NOT NULL,
    "num" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RejectedNumbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "ref" TEXT,
    "bank" TEXT DEFAULT 'Nequi',
    "payment_method" TEXT DEFAULT 'Transfer',
    "asset_id" TEXT NOT NULL,
    "secure_url" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "Numbers" ADD CONSTRAINT "Numbers_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
