import React, { FC } from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

import { getUserDetail } from '@/actions/user'
import UserProfile from '@/components/UserProfile/UserProfile'
import Container from '@/components/shared/Container'

type IProps = {
  params: {
    id: string
  }
}

const UserPage: FC<IProps> = async ({ params }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["user", params.id],
    queryFn: async () => getUserDetail(params.id)
  })


  return (
    <Container>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProfile id={params.id} />
      </HydrationBoundary>
    </Container>
  )
}

export default UserPage