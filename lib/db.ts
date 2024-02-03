import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
  var prisma: PrismaClient
}

export const db = global.prisma || new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV === 'production') {
  global.prisma = db
}