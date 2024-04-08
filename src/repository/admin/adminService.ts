import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface IAdmin {
    name: string;
    email: string;
    password: string;
}

export interface IRejectedNumbers {
    num: string;
    name: string;
    phone: string;
    creation_date: Date | string;
}

const validateIdforStatus = async (ids: string[], statuses = ['pending', 'pre-approved']) => {
    const existingNumbers = await prisma.numbers.findMany({
        where: {
            id: {
                in: ids,
            },
            payment_status: { in: statuses },
            isReserved: true,
        },
    });
    return existingNumbers;
}

const getUserByEmail = async (email: string) => {
    const existingUser = await prisma.admin.findMany({
        where: {
            email
        },
    });
    return existingUser[0];
}

const getAllRejected = async () => {
    const existingUser = await prisma.rejectedNumbers.findMany({
        orderBy: {
            creation_date: 'desc'
        }
    });
    return existingUser;
}

const sendToRejected = async (data: IRejectedNumbers) => {
    const result = await prisma.rejectedNumbers.create({
        data: data,
    });
    return result;
}

const createAdmins = async (data: IAdmin) => {
    const result = await prisma.admin.create({
        data: data,
    });
    return result;
}

const getWinner = async (num: string) => {
    const result = await prisma.numbers.findFirst({
        where: { num, payment_status: 'approved' },
        select: {
            name: true,
            phone: true,
        }
    });
    return result;
}

export { validateIdforStatus, getUserByEmail, createAdmins, getAllRejected, sendToRejected, getWinner };