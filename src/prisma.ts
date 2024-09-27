import {PrismaClient} from '@prisma/client';

let prisma: PrismaClient;

const globalThis = global as typeof global & { prisma: PrismaClient };

if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
    prisma = globalThis.prisma;
} else {
    prisma = globalThis.prisma
}

export default prisma;