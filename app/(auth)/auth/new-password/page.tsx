import React from 'react'

import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut'
import NewPasswordForm from '@/components/Auth/NewPasswordForm/NewPasswordForm'

const AuthResetPage = () => {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <PageFadeInOut>
        <div className='flex items-center justify-center w-full h-full px-2'>
          <NewPasswordForm />
        </div>
      </PageFadeInOut>
    </div>
  )
}

export default AuthResetPage