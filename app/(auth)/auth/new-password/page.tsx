import React, { Suspense } from 'react'

import NewPasswordForm from '@/components/Auth/NewPasswordForm/NewPasswordForm'

const AuthResetPage = () => {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <Suspense>
        <div className='flex items-center justify-center w-full h-full px-2'>
          <NewPasswordForm />
        </div>
      </Suspense>
    </div>
  )
}

export default AuthResetPage