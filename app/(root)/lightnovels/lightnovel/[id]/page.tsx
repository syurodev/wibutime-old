import { FC } from 'react'

import { getLightnovelDetail } from '@/actions/lightnovel';
import { notFound } from 'next/navigation';
import LightnovelDetail from '@/components/Content/Lightnovel/Detail/LightnovelDetail';

type IProps = {
  params: { id: string };
}

const LightnovelPage: FC<IProps> = async ({ params }) => {
  const lightnovel = await getLightnovelDetail(params.id)
  if (lightnovel.code !== 200 && !lightnovel.data) {
    notFound()
  }

  return (
    <LightnovelDetail
      data={lightnovel.data!}
    />
  )
}

export default LightnovelPage