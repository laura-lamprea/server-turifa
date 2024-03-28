import { DaysSince } from '../../utils/daysSince';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface INumbers {
    name?: string;
    phone?: string;
    invoice_id?: string;
    payment_status?: string;
    isReserved?: boolean;
    update_date?: Date;
}

export interface ICheckout {
    asset_id: string;
    secure_url: string;
    creation_date: Date | string;
}

const getNumbers = async () => {
    const numbers = await prisma.numbers.findMany({
        orderBy: {
            num: 'asc'
        },
        select: {
            id: true,
            num: true,
            isReserved: true,
            payment_status: true,
        },
    });
    return numbers;
}

const getNumberReserved = async () => {
    const numbers = await prisma.numbers.findMany({
        where: { isReserved: true, payment_status: "approved" },
        orderBy: {
            creation_date: 'desc'
        }
    });
    return numbers;
}

const getNumberToReject = async () => {
    const reservedNumbers = await prisma.numbers.findMany({
        where: {
            isReserved: true,
            payment_status: 'pending',
        },
        select: {
            id: true,
            num: true,
            name: true,
            phone: true,
            creation_date: true,
        },
    });
    const filteredNumbers = reservedNumbers.filter(
        (number) => {
            const creationDate = number.creation_date;
            return (
                creationDate &&
                typeof creationDate === "object" &&
                Number.isFinite(creationDate.getTime()) &&
                DaysSince(creationDate) > 3
            );
        }
    );

    return filteredNumbers;
};

async function getAllReservedNumbers(statuses = ['pending', 'approved', 'pre-approved']) {
    const numbers = await prisma.numbers.findMany({
        include: {
            invoice: true
        },
        where: {
            isReserved: true,
            payment_status: { in: statuses }
        },
        orderBy: {
            creation_date: 'desc'
        }

    });
    return numbers;
}

const getMyNumbers = async (phone: string): Promise<Record<string, INumbers[]>> => {
    const numbers = await prisma.numbers.findMany({
        where: {
            phone: phone,
            isReserved: true,
        },
        select: {
            id: true,
            num: true,
            phone: true,
            payment_status: true,
        }
    });

    const groupedNumbers: Record<string, INumbers[]> = {
        approved: [],
        pending: [],
        preapproved: [],
    };
    for (const number of numbers) {
        const { payment_status } = number;
        if (payment_status === 'approved') {
            groupedNumbers.approved.push(number as INumbers);
        } else if (payment_status === 'pre-approved') {
            groupedNumbers.preapproved.push(number as INumbers);
        } else {
            groupedNumbers.pending.push(number as INumbers);
        }
    }
    return groupedNumbers;
}

const updateNumberById = async (id: string, data: INumbers) => {
    const reserveNumber = await prisma.numbers.update({
        where: {
            id: id,
        },
        data,
    });
    return reserveNumber;
}

const validateIds = async (ids: string[], reserve: boolean = false) => {
    const existingNumbers = await prisma.numbers.findMany({
        where: {
            id: {
                in: ids,
            },
            isReserved: reserve,
        },
    });
    return existingNumbers.length === ids.length;
}

const cheackout = async (data: ICheckout) => {
    const result = await prisma.invoice.create({
        data: data,
    });
    return result;
}

const validateReference = async (reference: string) => {
    const result = await prisma.invoice.findMany({
        where: {
            ref: reference
        }
    });
    return result;
}



export { getNumbers, getMyNumbers, getAllReservedNumbers, updateNumberById, validateIds, getNumberReserved, cheackout, getNumberToReject, validateReference };