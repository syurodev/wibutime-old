import { getUserById } from '@/drizzle/queries/user/getUserById'

export async function GET() {
  const data = await getUserById("43d1c4eb-242b-4771-a361-e978cb1ffbc5")

  return new Response(JSON.stringify(data));
}