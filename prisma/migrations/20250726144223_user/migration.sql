-- AlterTable
ALTER TABLE "Outfit" ADD COLUMN     "categories" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "couleursMotifs" TEXT[],
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "morphologie" TEXT,
ADD COLUMN     "poids" DOUBLE PRECISION,
ADD COLUMN     "restrictions" TEXT,
ADD COLUMN     "stylesPreferes" TEXT[],
ADD COLUMN     "taille" DOUBLE PRECISION,
ADD COLUMN     "ville" TEXT;

-- CreateTable
CREATE TABLE "_OutfitsValides" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OutfitsValides_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_OutfitsRefuses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OutfitsRefuses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OutfitsValides_B_index" ON "_OutfitsValides"("B");

-- CreateIndex
CREATE INDEX "_OutfitsRefuses_B_index" ON "_OutfitsRefuses"("B");

-- AddForeignKey
ALTER TABLE "_OutfitsValides" ADD CONSTRAINT "_OutfitsValides_A_fkey" FOREIGN KEY ("A") REFERENCES "Outfit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OutfitsValides" ADD CONSTRAINT "_OutfitsValides_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OutfitsRefuses" ADD CONSTRAINT "_OutfitsRefuses_A_fkey" FOREIGN KEY ("A") REFERENCES "Outfit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OutfitsRefuses" ADD CONSTRAINT "_OutfitsRefuses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
