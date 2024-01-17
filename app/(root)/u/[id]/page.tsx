import { getUserDetail } from '@/actions/user'
import UserProfile from '@/components/UserProfile/UserProfile'
import React, { FC } from 'react'

type IProps = {
  params: {
    id: string
  }
}

const UserPage: FC<IProps> = async ({ params }) => {

  const res = await getUserDetail(params.id)

  if (res.code !== 200) return

  if (!res.data) return

  return (
    <UserProfile data={res.data} />
  )
}

export default UserPage