import React, { Suspense } from 'react'

import NewPasswordForm from '@/components/Auth/NewPasswordForm/NewPasswordForm'
import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut'

const AuthResetPage = () => {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <Suspense>
        <PageFadeInOut>
          <NewPasswordForm />
        </PageFadeInOut>
      </Suspense>
    </div>
  )
}

export default AuthResetPage