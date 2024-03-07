-- CreateTable
CREATE TABLE "Employees" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);
