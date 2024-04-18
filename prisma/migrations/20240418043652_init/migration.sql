-- CreateTable
CREATE TABLE "Earthquake" (
    "id" TEXT NOT NULL,
    "mag" DOUBLE PRECISION,
    "place" TEXT,
    "time" BIGINT NOT NULL,
    "updated" BIGINT NOT NULL,
    "tz" INTEGER,
    "url" TEXT,
    "detail" TEXT,
    "felt" INTEGER,
    "cdi" DOUBLE PRECISION,
    "mmi" DOUBLE PRECISION,
    "alert" TEXT,
    "status" TEXT,
    "tsunami" INTEGER,
    "sig" INTEGER,
    "net" TEXT,
    "code" TEXT,
    "ids" TEXT,
    "sources" TEXT,
    "types" TEXT,
    "nst" INTEGER,
    "dmin" DOUBLE PRECISION,
    "rms" DOUBLE PRECISION,
    "gap" INTEGER,
    "magType" TEXT,
    "type" TEXT,
    "title" TEXT,
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "depth" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Earthquake_pkey" PRIMARY KEY ("id")
);
