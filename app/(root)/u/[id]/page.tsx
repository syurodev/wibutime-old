import { getUserDetail } from '@/actions/user'
import UserProfile from '@/components/UserProfile/UserProfile'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'

type IProps = {
  params: {
    id: string
  }
}

const UserPage: FC<IProps> = async ({ params }) => {

  const res = await getUserDetail(params.id)

  if (!res.data) {
    notFound()
  }

  return (
    <UserProfile data={res.data} />
  )
}

export default UserPage