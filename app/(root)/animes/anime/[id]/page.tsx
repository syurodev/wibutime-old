
import { FC } from 'react'
import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut';

import Images from '@/components/Content/Detail/Images'
import Info from '@/components/Content/Detail/Info';

type IProps = {
  params: { id: string };
}

const AnimePage: FC<IProps> = ({ params }) => {

  return (
    <div>
      anime page
    </div>
  )
}

export default AnimePage