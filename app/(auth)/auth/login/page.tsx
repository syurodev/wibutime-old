import { FC, Suspense } from 'react'

import LoginForm from '@/components/Auth/LoginForm/LoginForm'
import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut'

const LoginPage: FC = () => {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <Suspense>
        <PageFadeInOut>
          <LoginForm />
        </PageFadeInOut>
      </Suspense>
    </div>
  )
}

export default LoginPage