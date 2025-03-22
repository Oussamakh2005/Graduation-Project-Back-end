-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('SUDAN', 'HATCHBACK', 'SUV', 'TRUCK', 'VAN', 'COUPE', 'CONVERTIBLE', 'WAGON', 'SPORTS', 'HYBRID');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('AUTO', 'MANUAL');

-- CreateEnum
CREATE TYPE "DriveType" AS ENUM ('FWD', 'RWD', 'AWD');

-- CreateEnum
CREATE TYPE "EngineType" AS ENUM ('PETROL', 'GAS', 'DIESEL', 'ELECTRIC', 'HYBRID');

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "colors" TEXT[],
    "type" "CarType" NOT NULL,
    "transmission" "Transmission" NOT NULL,
    "driveType" "DriveType" NOT NULL,
    "features" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Engine" (
    "id" TEXT NOT NULL,
    "type" "EngineType" NOT NULL,
    "capacity" TEXT NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Engine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Engine" ADD CONSTRAINT "Engine_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
