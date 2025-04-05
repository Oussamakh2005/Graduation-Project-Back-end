-- CreateEnum
CREATE TYPE "PickupStatus" AS ENUM ('PENDING', 'READY', 'PICKED_UP', 'CANCELLED');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "pickupStatus" "PickupStatus" NOT NULL DEFAULT 'PENDING';
