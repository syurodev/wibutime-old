import { db } from "@/lib/db";

export const getResetPasswordTokenByEmail = async (
  email: string
) => {
  try {
    const resetPasswordToken = await db.resetPasswordToken.findFirst({
      where: { email }
    });
    await db.$disconnect()

    return resetPasswordToken;
  } catch (error) {
    await db.$disconnect()

    console.log(error)
    return null
  }
}

export const getResetPasswordTokenByToken = async (
  token: string
) => {
  try {
    const resetPasswordToken = await db.resetPasswordToken.findUnique({
      where: { token }
    });
    await db.$disconnect()

    return resetPasswordToken;
  } catch (error) {
    await db.$disconnect()

    console.log(error)
    return null
  }
}