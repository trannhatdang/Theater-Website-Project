import 'dotenv/config';   // Loads environment variables from .env
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export default prisma;
