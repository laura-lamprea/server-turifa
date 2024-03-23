import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const numbers = Array.from({ length: 100 }, (_, index) => {
        const num = index.toString().padStart(2, '0');
        return { num };
    });

    await prisma.numbers.createMany({
        data: numbers.map(number => ({
            num: number.num,
            isReserved: false,
        })),
    });
}

main()
    .catch((error) => {
        console.error(error);
    })

