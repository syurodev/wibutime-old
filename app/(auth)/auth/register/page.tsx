import { FC } from 'react'

import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut'
import RegisterForm from '@/components/Auth/RegisterForm/RegisterForm'

const RegisterPage: FC = () => {

  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <PageFadeInOut>
        <div className='flex items-center justify-center w-full h-full px-2'>
          <RegisterForm />
        </div>
      </PageFadeInOut>
    </div>
  )
}

export default RegisterPage