import React, { Suspense } from 'react'

import NewVerificationForm from '@/components/Auth/NewVerificationForm/NewVerificationForm'
import PageFadeInOut from '@/components/shared/PageAnimatePresence/PageFadeInOut'

const NewVerificationPage = () => {
  return (
    <Suspense>
      <PageFadeInOut>
        <NewVerificationForm />
      </PageFadeInOut>
    </Suspense>
  )
}

export default NewVerificationPage