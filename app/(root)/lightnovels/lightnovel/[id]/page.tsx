import { FC } from 'react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getLightnovelDetail } from '@/actions/lightnovel';
import LightnovelDetail from '@/components/Content/Lightnovel/Detail/LightnovelDetail';

type IProps = {
  params: { id: string };
}

const LightnovelPage: FC<IProps> = async ({ params }) => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["lightnovel", params.id],
    queryFn: async () => await getLightnovelDetail(params.id)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LightnovelDetail
        id={params.id}
      />
    </HydrationBoundary>
  )
}

export default LightnovelPage