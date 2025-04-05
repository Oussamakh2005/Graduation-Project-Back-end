/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `paymentType` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('DOWNPAYMENT', 'INSTALLMENT_PAYMENT', 'FULL_PAYMENT');

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentType" "PaymentType" NOT NULL;
