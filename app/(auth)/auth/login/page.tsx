import { FC, Suspense } from 'react'

import LoginForm from '@/components/Auth/LoginForm/LoginForm'

const LoginPage: FC = () => {
  return (
    <div className='w-full h-dvh flex justify-center items-center'>
      <Suspense>
        <div className='flex items-center justify-center w-full h-full px-2'>
          <LoginForm />
        </div>
      </Suspense>
    </div>
  )
}

export default LoginPage