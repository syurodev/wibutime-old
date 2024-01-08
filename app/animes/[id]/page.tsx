import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut';
import { FC } from 'react'

type IProps = {
  params: { id: string };
}

const AnimePage: FC<IProps> = ({ params }) => {

  return (
    <PageFadeInOut>
      <div>{params.id}</div>
    </PageFadeInOut>
  )
}

export default AnimePage