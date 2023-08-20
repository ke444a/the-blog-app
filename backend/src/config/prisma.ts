import { PrismaClient } from "@prisma/client";

declare const global: {
    prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;
if (process.env.NODE_ENV === "prod") {
    prisma = new PrismaClient({
        errorFormat: "minimal",
    });
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            errorFormat: "minimal",
        });
    }
    prisma = global.prisma;
}

export default prisma;
