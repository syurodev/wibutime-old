import { FC } from 'react'

import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut'
import LoginForm from '@/components/Auth/LoginForm/LoginForm'

const LoginPage: FC = () => {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <PageFadeInOut>
        <div className='flex items-center justify-center w-full h-full px-2'>
          <LoginForm />
        </div>
      </PageFadeInOut>
    </div>
  )
}

export default LoginPage