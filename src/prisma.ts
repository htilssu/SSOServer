import {PrismaClient} from "@prisma/client/edge"

const global = globalThis as typeof globalThis & { prisma?: PrismaClient };

if (!global.prisma) {
    global.prisma = new PrismaClient();
}

export default global.prisma!;