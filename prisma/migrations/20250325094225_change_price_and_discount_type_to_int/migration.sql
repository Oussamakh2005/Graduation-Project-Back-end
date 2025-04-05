/*
  Warnings:

  - You are about to alter the column `price` on the `CarModel` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `discount` on the `CarModel` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "CarModel" ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "discount" DROP DEFAULT,
ALTER COLUMN "discount" SET DATA TYPE INTEGER;
