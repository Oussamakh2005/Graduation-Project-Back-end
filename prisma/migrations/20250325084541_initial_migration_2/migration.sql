-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SALES', 'PAYMENT', 'CLIENT');

-- CreateEnum
CREATE TYPE "CarModelType" AS ENUM ('SEDAN', 'HATCHBACK', 'SUV', 'TRUCK', 'VAN', 'COUPE', 'CONVERTIBLE', 'WAGON', 'SPORTS', 'HYBRID');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('AUTO', 'MANUAL');

-- CreateEnum
CREATE TYPE "DriveType" AS ENUM ('FRONT_WHEEL', 'REAR_WHEEL', 'ALL_WHEEL');

-- CreateEnum
CREATE TYPE "EngineType" AS ENUM ('PETROL', 'GAS', 'DIESEL', 'ELECTRIC', 'HYBRID');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'ONLINE', 'INSTALLMENT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "InstallmentStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" "CarModelType" NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "driveType" "DriveType" NOT NULL,
    "colors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "availability" BOOLEAN NOT NULL DEFAULT false,
    "mainImage" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engine" (
    "id" TEXT NOT NULL,
    "type" "EngineType" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "carModelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Engine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "carModelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "carColor" TEXT NOT NULL,
    "salePrice" DECIMAL(10,2) NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "paymentAmount" DECIMAL(10,2) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "transactionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstallmentPlan" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "installmentsNumber" INTEGER NOT NULL,
    "remainingInstallments" INTEGER NOT NULL,
    "installmentValue" DECIMAL(10,2) NOT NULL,
    "status" "PlanStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "interestRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "downPayment" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstallmentPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Installment" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paymentId" TEXT,
    "status" "InstallmentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Installment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_id_idx" ON "User"("email", "id");

-- CreateIndex
CREATE INDEX "CarModel_year_type_idx" ON "CarModel"("year", "type");

-- CreateIndex
CREATE INDEX "Engine_carModelId_idx" ON "Engine"("carModelId");

-- CreateIndex
CREATE INDEX "Sale_carModelId_userId_idx" ON "Sale"("carModelId", "userId");

-- CreateIndex
CREATE INDEX "Sale_paymentStatus_idx" ON "Sale"("paymentStatus");

-- CreateIndex
CREATE INDEX "InstallmentPlan_saleId_idx" ON "InstallmentPlan"("saleId");

-- CreateIndex
CREATE INDEX "InstallmentPlan_status_idx" ON "InstallmentPlan"("status");

-- CreateIndex
CREATE INDEX "Installment_planId_idx" ON "Installment"("planId");

-- CreateIndex
CREATE INDEX "Installment_status_idx" ON "Installment"("status");

-- AddForeignKey
ALTER TABLE "Engine" ADD CONSTRAINT "Engine_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstallmentPlan" ADD CONSTRAINT "InstallmentPlan_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_planId_fkey" FOREIGN KEY ("planId") REFERENCES "InstallmentPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
