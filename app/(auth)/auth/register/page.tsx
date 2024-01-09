'use client'

import { FC } from 'react'

import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut'
import RegisterForm from '@/components/Auth/RegisterForm/RegisterForm'


const RegisterPage: FC = () => {


  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <PageFadeInOut>
        <RegisterForm />
      </PageFadeInOut>
    </div>
  )
}

export default RegisterPage