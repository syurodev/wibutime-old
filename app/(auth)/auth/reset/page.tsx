import React from 'react'

import ResetForm from '@/components/Auth/ResetForm/ResetForm'
import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut'

const AuthResetPage = () => {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <PageFadeInOut>
        <div className='flex items-center justify-center w-full h-full px-2'>
          <ResetForm />
        </div>
      </PageFadeInOut>
    </div>
  )
}

export default AuthResetPage