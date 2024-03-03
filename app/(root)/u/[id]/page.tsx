import React, { FC } from 'react'

import UserProfile from '@/components/UserProfile/UserProfile'
import Container from '@/components/shared/Container'
import { notFound } from 'next/navigation'

type IProps = {
  params: {
    id: string
  }
}

const UserPage: FC<IProps> = async ({ params }) => {
  const res = await fetch(
    `${process.env.APP_URL}/api/u/${params.id}`,
    {
      cache: "default"
    }
  )

  if (!res.ok) return notFound()

  const data: {
    status: "success" | "error",
    data: UserProfile | null
  } = await res.json()

  if (data.status === "error" || !data.data) return notFound()

  return (
    <Container>
      <UserProfile data={data.data} />
    </Container>
  )
}

export default UserPage