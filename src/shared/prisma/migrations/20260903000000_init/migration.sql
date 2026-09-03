-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'REGULAR', 'VIEWER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'REGULAR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ship" (
    "id" TEXT NOT NULL,
    "mmsi" TEXT,
    "shipName" TEXT NOT NULL DEFAULT '',
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rateOfTurn" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "trueHeading" INTEGER NOT NULL DEFAULT 0,
    "cog" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sog" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "navigationalStatus" INTEGER NOT NULL DEFAULT 15,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipStaticData" (
    "id" TEXT NOT NULL,
    "shipId" TEXT NOT NULL,
    "callSign" TEXT,
    "destination" TEXT,
    "dimensionA" INTEGER NOT NULL DEFAULT 0,
    "dimensionB" INTEGER NOT NULL DEFAULT 0,
    "dimensionC" INTEGER NOT NULL DEFAULT 0,
    "dimensionD" INTEGER NOT NULL DEFAULT 0,
    "etaDay" INTEGER,
    "etaHour" INTEGER,
    "etaMinute" INTEGER,
    "etaMonth" INTEGER,
    "maximumStaticDraught" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL DEFAULT '',
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShipStaticData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchivedShip" (
    "id" TEXT NOT NULL,
    "mmsi" TEXT,
    "shipName" TEXT NOT NULL DEFAULT '',
    "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rateOfTurn" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "trueHeading" INTEGER NOT NULL DEFAULT 0,
    "cog" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sog" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "navigationalStatus" INTEGER NOT NULL DEFAULT 15,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArchivedShip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchivedShipStaticData" (
    "id" TEXT NOT NULL,
    "archivedShipId" TEXT NOT NULL,
    "callSign" TEXT,
    "destination" TEXT,
    "dimensionA" INTEGER NOT NULL DEFAULT 0,
    "dimensionB" INTEGER NOT NULL DEFAULT 0,
    "dimensionC" INTEGER NOT NULL DEFAULT 0,
    "dimensionD" INTEGER NOT NULL DEFAULT 0,
    "etaDay" INTEGER,
    "etaHour" INTEGER,
    "etaMinute" INTEGER,
    "etaMonth" INTEGER,
    "maximumStaticDraught" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL DEFAULT '',
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArchivedShipStaticData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ShipStaticData_shipId_key" ON "ShipStaticData"("shipId");

-- CreateIndex
CREATE UNIQUE INDEX "ArchivedShipStaticData_archivedShipId_key" ON "ArchivedShipStaticData"("archivedShipId");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipStaticData" ADD CONSTRAINT "ShipStaticData_shipId_fkey" FOREIGN KEY ("shipId") REFERENCES "Ship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedShipStaticData" ADD CONSTRAINT "ArchivedShipStaticData_archivedShipId_fkey" FOREIGN KEY ("archivedShipId") REFERENCES "ArchivedShip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
