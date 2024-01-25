import React, { Suspense } from 'react'

import NewVerificationForm from '@/components/Auth/NewVerificationForm/NewVerificationForm'

const NewVerificationPage = () => {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  )
}

export default NewVerificationPage