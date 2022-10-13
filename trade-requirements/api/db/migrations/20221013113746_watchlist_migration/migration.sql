-- CreateTable
CREATE TABLE "watchlist" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "symbols" TEXT[],

    CONSTRAINT "watchlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "watchlist_email_key" ON "watchlist"("email");
