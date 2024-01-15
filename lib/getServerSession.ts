import { auth } from "@/auth";

export const getServerSession = async () => {
  const session = await auth()

  return session?.user
}