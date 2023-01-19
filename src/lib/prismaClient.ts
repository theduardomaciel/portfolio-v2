/* import { PrismaClient } from '@prisma/client/edge'

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

const prisma =
    global.prisma ||
    new PrismaClient({
        datasources: {
            db: {
                url: import.meta.env.DATABASE_URL,
            },
        },
    }) // { log: ['query']}

if (import.meta.env.NODE_ENV !== "production") global.prisma = prisma

export default prisma; */

import type { PrismaClient as PrismaClientType } from '@prisma/client/index';
import { PrismaClient } from '@prisma/client/edge';

let prisma: PrismaClientType | undefined;

if (import.meta.env.MODE === 'development') {
    prisma = new PrismaClient();
} else {
    import('@prisma/client/edge').then(
        mod =>
        (prisma = new mod.PrismaClient({
            datasources: {
                db: {
                    url: import.meta.env.DATABASE_URL,
                },
            },
        }))
    );
}

export default prisma;