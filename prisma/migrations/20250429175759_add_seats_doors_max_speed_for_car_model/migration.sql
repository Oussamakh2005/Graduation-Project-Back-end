/*
  Warnings:

  - Added the required column `doors` to the `CarModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxSpeed` to the `CarModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `CarModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarModel" ADD COLUMN     "doors" INTEGER NOT NULL,
ADD COLUMN     "maxSpeed" INTEGER NOT NULL,
ADD COLUMN     "seats" INTEGER NOT NULL;
