import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (
  email: string
) => {
  try {
    const verificationToken = await db.verification_token.findFirst({
      where: { email }
    });
    await db.$disconnect()

    return verificationToken;
  } catch (error) {
    await db.$disconnect()

    console.log(error)
    return null
  }
}

export const getVerificationTokenByToken = async (
  token: string
) => {
  try {
    const verificationToken = await db.verification_token.findUnique({
      where: { token }
    });
    await db.$disconnect()

    return verificationToken;
  } catch (error) {
    await db.$disconnect()

    console.log(error)
    return null
  }
}